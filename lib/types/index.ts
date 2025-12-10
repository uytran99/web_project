export interface Device {
  _id: string;
  deviceId: string;
  name: string;
  status: 'online' | 'offline';
  lastConnected?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeartRateData {
  _id: string;
  deviceId: string;
  heartRate: number; // BPM
  timestamp: string;
  status: 'normal' | 'abnormal';
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  totalDevices: number;
  activeDevices: number;
  todayReadings: number;
  averageHeartRate: number;
  abnormalAlerts: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface HeartRateFilters {
  deviceId?: string;
  startDate?: string;
  endDate?: string;
  minHeartRate?: number;
  maxHeartRate?: number;
  status?: 'normal' | 'abnormal';
  page?: number;
  limit?: number;
}

