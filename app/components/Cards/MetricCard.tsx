'use client';

import { Card, Statistic } from 'antd';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  valueStyle?: React.CSSProperties;
  loading?: boolean;
}

export default function MetricCard({
  title,
  value,
  prefix,
  suffix,
  valueStyle,
  loading = false,
}: MetricCardProps) {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={valueStyle}
        loading={loading}
      />
    </Card>
  );
}

