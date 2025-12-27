import apiClient from './client';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    name: string;
    role: string;
  };
}

export interface AuthUser {
  _id: string;
  username: string;
  name: string;
  role: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
