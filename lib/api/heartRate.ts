import apiClient from './client';
import { HeartRateData, HeartRateFilters, PaginatedResponse } from '../types';

export const heartRateApi = {
  getAll: async (filters?: HeartRateFilters): Promise<PaginatedResponse<HeartRateData>> => {
    const params = new URLSearchParams();
    
    if (filters?.deviceId) params.append('deviceId', filters.deviceId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.minHeartRate) params.append('minHeartRate', filters.minHeartRate.toString());
    if (filters?.maxHeartRate) params.append('maxHeartRate', filters.maxHeartRate.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`/heart-rate?${params.toString()}`);
    return response.data || response;
  },

  getById: async (id: string): Promise<HeartRateData> => {
    const response = await apiClient.get(`/heart-rate/${id}`);
    return response.data || response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/heart-rate/${id}`);
  },
};

