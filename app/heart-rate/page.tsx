'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Switch,
} from 'antd';
import {
  ExportOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  LineChartOutlined,
  TableOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import MainLayout from '@/app/components/Layout/MainLayout';
import HeartRateChart from '@/app/components/Charts/HeartRateChart';
import { heartRateApi } from '@/lib/api/heartRate';
import { devicesApi } from '@/lib/api/devices';
import { HeartRateData, Device, HeartRateFilters } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';
import { exportToJSON, exportToCSV } from '@/lib/utils/export';
import { STATUS_COLORS, HEART_RATE_RANGES } from '@/lib/constants';

const { RangePicker } = DatePicker;

export default function HeartRatePage() {
  const [data, setData] = useState<HeartRateData[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Filters
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [minHeartRate, setMinHeartRate] = useState<number | undefined>();
  const [maxHeartRate, setMaxHeartRate] = useState<number | undefined>();
  const [statusFilter, setStatusFilter] = useState<'normal' | 'abnormal' | undefined>();

  useEffect(() => {
    fetchDevices();
    fetchData();
  }, [currentPage, pageSize]);

  const fetchDevices = async () => {
    try {
      const deviceList = await devicesApi.getAll();
      setDevices(deviceList);
    } catch (error) {
      console.error('Fetch devices error:', error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const filters: HeartRateFilters = {
        page: currentPage,
        limit: pageSize,
        deviceId: selectedDevice,
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString(),
        minHeartRate,
        maxHeartRate,
        status: statusFilter,
      };

      const response = await heartRateApi.getAll(filters);
      setData(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      message.error('Failed to load heart rate data');
      console.error('Fetch heart rate error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await heartRateApi.delete(id);
      message.success('Data deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete data');
      console.error('Delete heart rate error:', error);
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    if (data.length === 0) {
      message.warning('No data to export');
      return;
    }

    if (format === 'json') {
      exportToJSON(data, `heart-rate-data-${dayjs().format('YYYY-MM-DD')}`);
    } else {
      exportToCSV(data, `heart-rate-data-${dayjs().format('YYYY-MM-DD')}`);
    }
    message.success(`Export ${format.toUpperCase()} successful`);
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleReset = () => {
    setSelectedDevice(undefined);
    setDateRange(null);
    setMinHeartRate(undefined);
    setMaxHeartRate(undefined);
    setStatusFilter(undefined);
    setCurrentPage(1);
    setTimeout(() => fetchData(), 100);
  };

  const columns: ColumnsType<HeartRateData> = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => formatDate(text),
      sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
    {
      title: 'Device ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      sorter: (a, b) => a.deviceId.localeCompare(b.deviceId),
    },
    {
      title: 'Heart Rate (BPM)',
      dataIndex: 'heartRate',
      key: 'heartRate',
      render: (value: number) => <strong>{value}</strong>,
      sorter: (a, b) => a.heartRate - b.heartRate,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'normal' ? STATUS_COLORS.normal : STATUS_COLORS.abnormal}>
          {status === 'normal' ? 'Normal' : 'Abnormal'}
        </Tag>
      ),
      filters: [
        { text: 'Normal', value: 'normal' },
        { text: 'Abnormal', value: 'abnormal' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Delete Data"
          description="Are you sure you want to delete this data?"
          onConfirm={() => handleDelete(record._id)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Heart Rate Data</h1>
          <Space>
            <Switch
              checkedChildren={<TableOutlined />}
              unCheckedChildren={<LineChartOutlined />}
              checked={viewMode === 'table'}
              onChange={(checked) => setViewMode(checked ? 'table' : 'chart')}
            />
            <Button icon={<ReloadOutlined />} onClick={fetchData}>
              Refresh
            </Button>
            <Button icon={<ExportOutlined />} onClick={() => handleExport('json')}>
              Export JSON
            </Button>
            <Button icon={<ExportOutlined />} onClick={() => handleExport('csv')}>
              Export CSV
            </Button>
          </Space>
        </div>

        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Select Device"
                style={{ width: '100%' }}
                allowClear
                value={selectedDevice}
                onChange={setSelectedDevice}
              >
                {devices.map((device) => (
                  <Select.Option key={device._id} value={device.deviceId}>
                    {device.name} ({device.deviceId})
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RangePicker
                style={{ width: '100%' }}
                value={dateRange}
                onChange={setDateRange}
                showTime
                format="DD/MM/YYYY HH:mm"
              />
            </Col>
            <Col xs={24} sm={12} md={3}>
              <Input
                placeholder="Min BPM"
                type="number"
                value={minHeartRate}
                onChange={(e) => setMinHeartRate(e.target.value ? Number(e.target.value) : undefined)}
              />
            </Col>
            <Col xs={24} sm={12} md={3}>
              <Input
                placeholder="Max BPM"
                type="number"
                value={maxHeartRate}
                onChange={(e) => setMaxHeartRate(e.target.value ? Number(e.target.value) : undefined)}
              />
            </Col>
            <Col xs={24} sm={12} md={3}>
              <Select
                placeholder="Status"
                style={{ width: '100%' }}
                allowClear
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Select.Option value="normal">Normal</Select.Option>
                <Select.Option value="abnormal">Abnormal</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={3}>
              <Space>
                <Button type="primary" onClick={handleFilter}>
                  Filter
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} records`,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
          />
        ) : (
          <Card title="Heart Rate Chart">
            {data.length > 0 ? (
              <HeartRateChart data={data} height={400} />
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', color: '#8c8c8c' }}>
                No data available
              </div>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

