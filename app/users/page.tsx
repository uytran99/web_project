'use client';

import MainLayout from '@/app/components/Layout/MainLayout';
import { Card, Empty } from 'antd';

export default function UsersPage() {
  return (
    <MainLayout>
      <div>
        <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
          User Management
        </h1>
        <Card>
          <Empty description="Feature under development" />
        </Card>
      </div>
    </MainLayout>
  );
}

