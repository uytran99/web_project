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
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '4px 0 24px rgba(102, 126, 234, 0.2)',
      }}
      theme="dark"
    >
      <div 
        className="animate-fade-in"
        style={{ 
          padding: '24px 16px', 
          textAlign: 'center', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ 
          fontSize: '32px',
          marginBottom: '8px',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
        }}>
          ❤️
        </div>
        <h2 style={{ 
          margin: 0, 
          fontSize: '22px', 
          fontWeight: '800',
          color: 'white',
          letterSpacing: '0.5px',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          IoT Admin
        </h2>
        <p style={{ 
          margin: '4px 0 0 0', 
          fontSize: '12px', 
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: '500',
          letterSpacing: '0.5px'
        }}>
          Heart Rate Monitor
        </p>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ 
          borderRight: 0, 
          marginTop: '16px',
          background: 'transparent',
          fontSize: '15px',
          fontWeight: '500'
        }}
        theme="dark"
      />
      
      <style jsx global>{`
        .ant-menu-dark.ant-menu-inline .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .ant-menu-dark.ant-menu-inline .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateX(4px);
        }
        
        .ant-menu-dark.ant-menu-inline .ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-weight: 600;
        }
        
        .ant-menu-dark .ant-menu-item-icon {
          font-size: 18px;
          transition: all 0.3s ease;
        }
        
        .ant-menu-dark .ant-menu-item:hover .ant-menu-item-icon {
          transform: scale(1.1);
        }
        
        .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon {
          transform: scale(1.15);
        }
      `}</style>
    </Sider>
  );
}

