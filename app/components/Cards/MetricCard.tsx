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
  gradient?: string;
}

const defaultGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function MetricCard({
  title,
  value,
  prefix,
  suffix,
  valueStyle,
  loading = false,
  gradient,
}: MetricCardProps) {
  const randomGradient = gradient || defaultGradients[Math.floor(Math.random() * defaultGradients.length)];

  return (
    <Card
      className="animate-fade-in"
      bordered={false}
      style={{
        background: randomGradient,
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
      }}
    >
      {/* Decorative Circle */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      />
      
      <Statistic
        title={
          <span style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {title}
          </span>
        }
        value={value}
        prefix={
          <span style={{ 
            color: 'white',
            fontSize: '24px',
            marginRight: '8px',
          }}>
            {prefix}
          </span>
        }
        suffix={
          <span style={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '18px',
            fontWeight: '500',
          }}>
            {suffix}
          </span>
        }
        valueStyle={{
          color: 'white',
          fontSize: '32px',
          fontWeight: '700',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          ...valueStyle,
        }}
        loading={loading}
      />
    </Card>
  );
}

