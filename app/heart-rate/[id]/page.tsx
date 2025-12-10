'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Descriptions, Tag, Button, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MainLayout from '@/app/components/Layout/MainLayout';
import HeartRateChart from '@/app/components/Charts/HeartRateChart';
import { heartRateApi } from '@/lib/api/heartRate';
import { HeartRateData } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';
import { STATUS_COLORS } from '@/lib/constants';

export default function HeartRateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<HeartRateData | null>(null);
  const [relatedData, setRelatedData] = useState<HeartRateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const record = await heartRateApi.getById(params.id as string);
      setData(record);

      // Fetch related data from same device
      const response = await heartRateApi.getAll({
        deviceId: record.deviceId,
        limit: 50,
      });
      setRelatedData(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Fetch detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <Alert
          message="Error"
          description={error || 'Data not found'}
          type="error"
          showIcon
          action={
            <Button onClick={() => router.push('/heart-rate')}>Go Back</Button>
          }
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/heart-rate')}
          style={{ marginBottom: '16px' }}
        >
          Go Back
        </Button>

        <Card title="Heart Rate Data Details" style={{ marginBottom: '24px' }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID">{data._id}</Descriptions.Item>
            <Descriptions.Item label="Device ID">{data.deviceId}</Descriptions.Item>
            <Descriptions.Item label="Heart Rate">
              <strong style={{ fontSize: '18px' }}>{data.heartRate} BPM</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={data.status === 'normal' ? STATUS_COLORS.normal : STATUS_COLORS.abnormal}>
                {data.status === 'normal' ? 'Normal' : 'Abnormal'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Time" span={2}>
              {formatDate(data.timestamp)}
            </Descriptions.Item>
            {data.metadata && Object.keys(data.metadata).length > 0 && (
              <Descriptions.Item label="Metadata" span={2}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(data.metadata, null, 2)}
                </pre>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>

        <Card title={`Heart Rate Chart - Device: ${data.deviceId}`}>
          {relatedData.length > 0 ? (
            <HeartRateChart data={relatedData} height={400} />
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', color: '#8c8c8c' }}>
              No related data available
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}

