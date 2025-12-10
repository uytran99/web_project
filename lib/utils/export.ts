import { HeartRateData } from '../types';

export const exportToJSON = (data: HeartRateData[], filename: string = 'heart-rate-data') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data: HeartRateData[], filename: string = 'heart-rate-data') => {
  if (data.length === 0) return;

  const headers = ['ID', 'Device ID', 'Heart Rate (BPM)', 'Timestamp', 'Status'];
  const rows = data.map((item) => [
    item._id,
    item.deviceId,
    item.heartRate.toString(),
    item.timestamp,
    item.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

