'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Popconfirm, message, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MainLayout from '@/app/components/Layout/MainLayout';
import DeviceForm from '@/app/components/Forms/DeviceForm';
import { devicesApi } from '@/lib/api/devices';
import { Device } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';
import { STATUS_COLORS } from '@/lib/constants';

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const data = await devicesApi.getAll();
      setDevices(data);
    } catch (error) {
      message.error('Failed to load devices list');
      console.error('Fetch devices error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingDevice(undefined);
    setFormVisible(true);
  };

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await devicesApi.delete(id);
      message.success('Device deleted successfully');
      fetchDevices();
    } catch (error) {
      message.error('Failed to delete device');
      console.error('Delete device error:', error);
    }
  };

  const handleFormSubmit = async (values: Partial<Device>) => {
    try {
      if (editingDevice?._id) {
        await devicesApi.update(editingDevice._id, values);
        message.success('Device updated successfully');
      } else {
        await devicesApi.create(values as Omit<Device, '_id' | 'createdAt' | 'updatedAt'>);
        message.success('Device added successfully');
      }
      setFormVisible(false);
      setEditingDevice(undefined);
      fetchDevices();
    } catch (error) {
      message.error(editingDevice?._id ? 'Failed to update device' : 'Failed to add device');
      console.error('Submit device error:', error);
    }
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchText.toLowerCase()) ||
      device.deviceId.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Device> = [
    {
      title: 'Device ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      sorter: (a, b) => a.deviceId.localeCompare(b.deviceId),
    },
    {
      title: 'Device Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'online' ? STATUS_COLORS.online : STATUS_COLORS.offline}>
          {status === 'online' ? 'Online' : 'Offline'}
        </Tag>
      ),
      filters: [
        { text: 'Online', value: 'online' },
        { text: 'Offline', value: 'offline' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Last Connected',
      dataIndex: 'lastConnected',
      key: 'lastConnected',
      render: (text: string) => (text ? formatDate(text) : 'Never'),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Device"
            description="Are you sure you want to delete this device?"
            onConfirm={() => handleDelete(record._id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>IoT Devices Management</h1>
          <Space>
            <Input
              placeholder="Search devices..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Device
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDevices}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} devices`,
          }}
        />

        <DeviceForm
          open={formVisible}
          onCancel={() => {
            setFormVisible(false);
            setEditingDevice(undefined);
          }}
          onFinish={handleFormSubmit}
          initialValues={editingDevice}
        />
      </div>
    </MainLayout>
  );
}

