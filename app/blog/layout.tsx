import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Jing Lee',
  description: 'Technical articles and thoughts by Jing Lee',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}