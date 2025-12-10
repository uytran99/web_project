import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IoT Heart Rate Admin Dashboard",
  description: "Admin dashboard for IoT heart rate monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#667eea',
              colorSuccess: '#38ef7d',
              colorWarning: '#f5576c',
              colorError: '#eb3349',
              colorInfo: '#4facfe',
              borderRadius: 8,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
            components: {
              Button: {
                primaryShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              },
              Card: {
                borderRadiusLG: 16,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
