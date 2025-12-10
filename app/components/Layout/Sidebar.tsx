'use client';

import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  DashboardOutlined,
  HeartOutlined,
  MobileOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/devices',
    icon: <MobileOutlined />,
    label: 'IoT Devices',
  },
  {
    key: '/heart-rate',
    icon: <HeartOutlined />,
    label: 'Heart Rate Data',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      theme="light"
    >
      <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>IoT Admin</h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8c8c8c' }}>
          Heart Rate Monitor
        </p>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0, marginTop: '8px' }}
      />
    </Sider>
  );
}

