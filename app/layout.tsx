import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientLayout } from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jing Lee - Frontend Developer',
  description: 'Frontend Developer based in Tokyo, Japan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}