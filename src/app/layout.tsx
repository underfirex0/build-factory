import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BuildFactory',
  description: 'Bulk website factory — templates, builds, and CRM in one place.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
