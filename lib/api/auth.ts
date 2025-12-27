import apiClient from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
  email: string;
}

export interface AuthUser {
  _id: string;
  userId: string;
  username: string;
  email: string;
  name: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // API returns the response directly (not wrapped in data)
    const response = await apiClient.post('/auth/login', credentials);
    return response as unknown as LoginResponse;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.get('/auth/me');
    return response as unknown as AuthUser;
  },
};


