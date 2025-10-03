// admin/layout.tsx (server component by default)
import Sidebar from '@/components/admin/Sidebar';
import LoadingScreen from '@/components/common/loaders/LoadingScreen';
import { Suspense } from 'react';

export const metadata = {
    title: 'Bright Smile Admin',
    description: 'Dental appointment booking system - Admin Panel',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Client component inside server component */}
            <Suspense fallback={<LoadingScreen />}>
                <Sidebar />
            </Suspense>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children} {/* children can be server components */}
                </main>
            </div>
        </div>
    );
}
