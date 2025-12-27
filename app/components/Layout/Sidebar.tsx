'use client';

import { Layout, Menu, Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  DashboardOutlined,
  HeartOutlined,
  MobileOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/lib/contexts/AuthContext';

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
  const { logout, user } = useAuth();

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
        display: 'flex',
        flexDirection: 'column',
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
          fontWeight: '500',
          flex: 1,
        }}
        theme="dark"
      />
      
      {/* Logout Section */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.1)',
      }}>
        {user && (
          <div style={{
            marginBottom: '12px',
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}>Đăng nhập với</p>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
            }}>{user.name || user.username}</p>
          </div>
        )}
        <Button
          type="default"
          icon={<LogoutOutlined />}
          onClick={logout}
          block
          style={{
            height: '44px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: '600',
            fontSize: '15px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Đăng xuất
        </Button>
      </div>
      
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

