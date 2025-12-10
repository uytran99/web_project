import apiClient from './client';
import { Device, PaginatedResponse } from '../types';

export const devicesApi = {
  getAll: async (): Promise<Device[]> => {
    const response = await apiClient.get('/devices');
    return response.data || response;
  },

  getById: async (id: string): Promise<Device> => {
    const response = await apiClient.get(`/devices/${id}`);
    return response.data || response;
  },

  create: async (device: Omit<Device, '_id' | 'createdAt' | 'updatedAt'>): Promise<Device> => {
    const response = await apiClient.post('/devices', device);
    return response.data || response;
  },

  update: async (id: string, device: Partial<Device>): Promise<Device> => {
    const response = await apiClient.put(`/devices/${id}`, device);
    return response.data || response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/devices/${id}`);
  },
};

