"use client";

import { Layout, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;

const userMenuItems: MenuProps["items"] = [
    {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
    },
    {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        danger: true,
    },
];

export default function Header() {
    return (
        <AntHeader
            style={{
                padding: "0 24px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            <Space size="large">
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                    <Space style={{ cursor: "pointer" }}>
                        <Avatar icon={<UserOutlined />} />
                        <span>Admin</span>
                    </Space>
                </Dropdown>
            </Space>
        </AntHeader>
    );
}
