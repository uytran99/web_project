import dayjs from 'dayjs';

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

export const formatDateShort = (date: string | Date): string => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatTime = (date: string | Date): string => {
  return dayjs(date).format('HH:mm:ss');
};

export const getDateRange = (days: number = 7) => {
  const end = dayjs();
  const start = dayjs().subtract(days, 'day');
  return [start.toISOString(), end.toISOString()];
};

export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isRecent = (date: string | Date, minutes: number = 5): boolean => {
  return dayjs().diff(dayjs(date), 'minute') < minutes;
};

