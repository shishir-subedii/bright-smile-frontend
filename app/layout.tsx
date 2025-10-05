import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { AuthInitializer } from '@/lib/stores/authInitializer';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
    title: 'Bright Smile',
    description: 'Dental appointment booking system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geist.className} bg-gray-50 min-h-screen flex flex-col`}>
                <AuthInitializer />
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}