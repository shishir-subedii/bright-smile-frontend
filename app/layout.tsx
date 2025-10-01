import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminFooter from '@/components/admin/AdminFooter';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'Bright Smile',
  description: 'Dental appointment booking system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Navbar />
        {/* <AdminNavbar /> */}
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <AdminFooter /> */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}