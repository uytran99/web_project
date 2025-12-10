# IoT Heart Rate Admin Dashboard

Web Admin Dashboard để quản trị hệ thống IoT đo nhịp tim, được xây dựng với Next.js, Ant Design, và TypeScript.

## Tính năng

- 📊 **Dashboard Tổng quan**: Metrics, biểu đồ nhịp tim, và hoạt động gần đây
- 📱 **Quản lý Thiết bị IoT**: CRUD operations cho thiết bị
- ❤️ **Dữ liệu Nhịp tim**: Xem, lọc, tìm kiếm và export dữ liệu nhịp tim
- 📈 **Biểu đồ**: Visualize dữ liệu nhịp tim theo thời gian
- 🔍 **Filtering & Search**: Lọc theo thiết bị, thời gian, khoảng nhịp tim
- 📤 **Export**: Export dữ liệu ra JSON hoặc CSV

## Cài đặt

1. Clone repository và cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env.local` và cấu hình API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Chạy development server:

```bash
npm run dev
```

4. Mở [http://localhost:3000](http://localhost:3000) trong browser.

## Cấu trúc dự án

```
app/
  ├── components/
  │   ├── Layout/          # Sidebar, Header, MainLayout
  │   ├── Charts/          # HeartRateChart component
  │   ├── Cards/           # MetricCard component
  │   └── Forms/           # DeviceForm component
  ├── dashboard/           # Dashboard page
  ├── devices/             # Devices management page
  ├── heart-rate/          # Heart rate data page
  ├── users/               # Users page (placeholder)
  └── settings/            # Settings page

lib/
  ├── api/                 # API client và service functions
  ├── types/               # TypeScript types/interfaces
  ├── utils/               # Utility functions
  └── config.ts            # App configuration
```

## API Endpoints

Dashboard kỳ vọng backend API có các endpoints sau:

- `GET /api/dashboard/stats` - Thống kê tổng quan
- `GET /api/devices` - Lấy danh sách thiết bị
- `GET /api/devices/:id` - Chi tiết thiết bị
- `POST /api/devices` - Tạo thiết bị mới
- `PUT /api/devices/:id` - Cập nhật thiết bị
- `DELETE /api/devices/:id` - Xóa thiết bị
- `GET /api/heart-rate` - Lấy dữ liệu nhịp tim (với query params)
- `GET /api/heart-rate/:id` - Chi tiết một record
- `DELETE /api/heart-rate/:id` - Xóa dữ liệu

## Tech Stack

- **Next.js 16** - React framework
- **Ant Design 6** - UI component library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **@ant-design/charts** - Chart library
- **dayjs** - Date manipulation

## Build

```bash
npm run build
npm start
```
