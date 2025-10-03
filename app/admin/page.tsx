import { Suspense } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import DashboardContent from '@/components/admin/DashboardContent';
import LoadingScreen from '@/components/common/loaders/LoadingScreen';

export default function AdminDashboard() {
    return (
        // <div className="flex h-screen overflow-hidden">
        //     {/* Sidebar */}
        //     <Sidebar />

        //     {/* Main Content */}
        //     <div className="flex-1 flex flex-col overflow-hidden">
        //         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        //             <Suspense fallback={<LoadingScreen />}>
        //                 <DashboardContent />
        //             </Suspense>
        //         </main>
        //     </div>
        // </div>
        <DashboardContent />
    );
}
