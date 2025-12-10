'use client';

import { Line } from '@ant-design/charts';
import { HeartRateData } from '@/lib/types';
import dayjs from 'dayjs';

interface HeartRateChartProps {
  data: HeartRateData[];
  height?: number;
}

export default function HeartRateChart({ data, height = 300 }: HeartRateChartProps) {
  const chartData = data.map((item) => ({
    time: dayjs(item.timestamp).format('HH:mm:ss'),
    value: item.heartRate,
    status: item.status,
  }));

  const config = {
    data: chartData,
    xField: 'time',
    yField: 'value',
    height,
    point: {
      size: 4,
      shape: 'circle',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    smooth: true,
    color: (d: { status: string }) => {
      return d.status === 'normal' ? '#52c41a' : '#ff4d4f';
    },
    tooltip: {
      formatter: (datum: { value: number; status: string }) => {
        return {
          name: 'Heart Rate',
          value: `${datum.value} BPM (${datum.status === 'normal' ? 'Normal' : 'Abnormal'})`,
        };
      },
    },
  };

  return <Line {...config} />;
}

