"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tag, Spin, Alert } from "antd";
import { HeartOutlined, MobileOutlined, AlertOutlined, LineChartOutlined } from "@ant-design/icons";
import MainLayout from "@/app/components/Layout/MainLayout";
import MetricCard from "@/app/components/Cards/MetricCard";
import HeartRateChart from "@/app/components/Charts/HeartRateChart";
import { dashboardApi } from "@/lib/api/dashboard";
import { heartRateApi } from "@/lib/api/heartRate";
import { DashboardStats, HeartRateData } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import { STATUS_COLORS } from "@/lib/constants";

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentData, setRecentData] = useState<HeartRateData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch stats
            const statsData = await dashboardApi.getStats();
            setStats(statsData);

            // Fetch recent heart rate data
            const recentResponse = await heartRateApi.getAll({ page: 1, limit: 10 });
            setRecentData(recentResponse.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred while loading data");
            console.error("Dashboard error:", err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Time",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (text: string) => formatDate(text),
        },
        {
            title: "Device ID",
            dataIndex: "deviceId",
            key: "deviceId",
        },
        {
            title: "Heart Rate (BPM)",
            dataIndex: "heartRate",
            key: "heartRate",
            render: (value: number) => <strong>{value}</strong>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => <Tag color={status === "normal" ? STATUS_COLORS.normal : STATUS_COLORS.abnormal}>{status === "normal" ? "Normal" : "Abnormal"}</Tag>,
        },
    ];

    if (loading && !stats) {
        return (
            <MainLayout>
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <Spin size="large" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="animate-fade-in">
                <h1 style={{ 
                    marginBottom: "32px", 
                    fontSize: "36px", 
                    fontWeight: "800",
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.5px'
                }}>
                    Dashboard Overview
                </h1>

                {error && <Alert message="Error" description={error} type="error" showIcon closable style={{ marginBottom: "24px" }} onClose={() => setError(null)} />}

                <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
                    <Col xs={24} sm={12} lg={6}>
                        <MetricCard 
                            title="Active Devices" 
                            value={stats?.activeDevices || 0} 
                            prefix={<MobileOutlined />} 
                            suffix={`/ ${stats?.totalDevices || 0}`} 
                            loading={loading}
                            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <MetricCard 
                            title="Today's Readings" 
                            value={stats?.todayReadings || 0} 
                            prefix={<LineChartOutlined />} 
                            loading={loading}
                            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                        />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <MetricCard 
                            title="Average Heart Rate" 
                            value={stats?.averageHeartRate || 0} 
                            prefix={<HeartOutlined />} 
                            suffix="BPM" 
                            loading={loading}
                            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                        />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <MetricCard 
                            title="Abnormal Alerts" 
                            value={stats?.abnormalAlerts || 0} 
                            prefix={<AlertOutlined />} 
                            loading={loading}
                            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                        />
                    </Col>
                </Row>

                <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
                    <Col xs={24} lg={16}>
                        <Card 
                            title={<span style={{ fontSize: '18px', fontWeight: '700' }}>Recent Heart Rate Chart</span>}
                            loading={loading}
                            bordered={false}
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            {recentData.length > 0 ? <HeartRateChart data={recentData} height={300} /> : <div style={{ textAlign: "center", padding: "50px", color: "#8c8c8c" }}>No data available</div>}
                        </Card>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card 
                            title={<span style={{ fontSize: '18px', fontWeight: '700' }}>Recent Activity</span>}
                            loading={loading}
                            bordered={false}
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Table dataSource={recentData} columns={columns} pagination={false} size="small" rowKey="_id" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
}
