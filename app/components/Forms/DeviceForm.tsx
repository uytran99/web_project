'use client';

import { Form, Input, Select, Modal } from 'antd';
import { Device } from '@/lib/types';

interface DeviceFormProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: Partial<Device>) => void;
  initialValues?: Partial<Device>;
  loading?: boolean;
}

export default function DeviceForm({
  open,
  onCancel,
  onFinish,
  initialValues,
  loading = false,
}: DeviceFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={open}
      title={initialValues?._id ? 'Update Device' : 'Add New Device'}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      confirmLoading={loading}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="deviceId"
          label="Device ID"
          rules={[{ required: true, message: 'Please enter Device ID' }]}
        >
          <Input placeholder="Enter Device ID" disabled={!!initialValues?._id} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Device Name"
          rules={[{ required: true, message: 'Please enter device name' }]}
        >
          <Input placeholder="Enter device name" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="online">Online</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

