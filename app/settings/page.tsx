'use client';

import MainLayout from '@/app/components/Layout/MainLayout';
import { Card, Form, Input, Button, message } from 'antd';
import { API_BASE_URL } from '@/lib/config';

export default function SettingsPage() {
  const [form] = Form.useForm();

  const handleSubmit = (values: { apiUrl: string }) => {
    // In a real app, you would save this to localStorage or a config file
    message.success('Settings saved successfully');
    console.log('Settings:', values);
  };

  return (
    <MainLayout>
      <div>
        <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Settings</h1>
        <Card title="API Configuration">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ apiUrl: API_BASE_URL }}
          >
            <Form.Item
              name="apiUrl"
              label="API Base URL"
              rules={[{ required: true, message: 'Please enter API URL' }]}
            >
              <Input placeholder="http://localhost:3001/api" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
}

