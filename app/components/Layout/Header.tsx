"use client";

import { Layout, Avatar, Dropdown, Space, Badge } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/lib/contexts/AuthContext";

const { Header: AntHeader } = Layout;

export default function Header() {
    const { user, logout } = useAuth();

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        if (key === "logout") {
            logout();
        }
    };

    const userMenuItems: MenuProps["items"] = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Profile",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            danger: true,
        },
    ];

    return (
        <AntHeader
            className="glass animate-fade-in"
            style={{
                padding: "0 32px",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
                position: "sticky",
                top: 0,
                zIndex: 100,
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
            }}
        >
            <Space size="large">
                <Badge count={3} offset={[-5, 5]}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                    >
                        <BellOutlined style={{ 
                            fontSize: '18px', 
                            color: 'white',
                        }} />
                    </div>
                </Badge>
                <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
                    <Space style={{ 
                        cursor: "pointer",
                        padding: '8px 16px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        background: 'rgba(102, 126, 234, 0.05)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                        <Avatar 
                            icon={<UserOutlined />}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            }}
                        />
                        <span style={{
                            fontWeight: '600',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>{user?.name || 'Admin'}</span>
                    </Space>
                </Dropdown>
            </Space>
        </AntHeader>
    );
}

