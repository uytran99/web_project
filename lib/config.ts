export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const HEART_RATE_RANGES = {
  NORMAL_MIN: 60,
  NORMAL_MAX: 100,
  ABNORMAL_MIN: 40,
  ABNORMAL_MAX: 120,
};

export const STATUS_COLORS = {
  online: '#52c41a',
  offline: '#ff4d4f',
  normal: '#52c41a',
  abnormal: '#ff4d4f',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
};

