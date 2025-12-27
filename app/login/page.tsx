"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Alert, Typography, Spin } from "antd";
import { MailOutlined, LockOutlined, HeartFilled, LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/lib/contexts/AuthContext";

const { Title, Text } = Typography;

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            setLoading(true);
            setError(null);
            await login(values);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#fff' }} spin />} />
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                top: '-100px',
                left: '-100px',
                animation: 'float 6s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                bottom: '-50px',
                right: '-50px',
                animation: 'float 8s ease-in-out infinite reverse',
            }} />
            <div style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                top: '50%',
                right: '20%',
                animation: 'float 10s ease-in-out infinite',
            }} />

            {/* Login Card */}
            <div
                className="animate-fade-in glass"
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '48px 40px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo & Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                        animation: 'float 3s ease-in-out infinite',
                    }}>
                        <HeartFilled style={{ fontSize: '36px', color: '#fff' }} />
                    </div>
                    <Title level={2} style={{
                        margin: 0,
                        fontSize: '28px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        IoT Heart Rate
                    </Title>
                    <Text style={{
                        color: '#8c8c8c',
                        fontSize: '16px',
                        marginTop: '8px',
                        display: 'block',
                    }}>
                        Đăng nhập vào Admin Dashboard
                    </Text>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError(null)}
                        style={{
                            marginBottom: '24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, rgba(235, 51, 73, 0.1) 0%, rgba(244, 92, 67, 0.1) 100%)',
                        }}
                    />
                )}

                {/* Login Form */}
                <Form
                    form={form}
                    name="login"
                    onFinish={handleSubmit}
                    size="large"
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: '#667eea' }} />}
                            placeholder="Email"
                            type="email"
                            style={{
                                height: '56px',
                                borderRadius: '14px',
                                border: '2px solid #f0f0f0',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#f0f0f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        style={{ marginBottom: '32px' }}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#667eea' }} />}
                            placeholder="Mật khẩu"
                            style={{
                                height: '56px',
                                borderRadius: '14px',
                                border: '2px solid #f0f0f0',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#f0f0f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{
                                height: '56px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontSize: '18px',
                                fontWeight: 600,
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                            }}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </Form.Item>
                </Form>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid #f0f0f0',
                }}>
                    <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
                        © 2024 IoT Heart Rate Monitoring System
                    </Text>
                </div>
            </div>
        </div>
    );
}
