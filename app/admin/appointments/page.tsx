import { Suspense } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AppointmentManagement from '@/components/admin/AppointmentManagement';
import LoadingScreen from '@/components/common/loaders/LoadingScreen';

export default function AppointmentsPage() {
    return (
        // <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        //     <Sidebar />
        //     <div className="flex-1 overflow-y-auto p-6">
        //         <Suspense fallback={<LoadingScreen />}>
        //             <AppointmentManagement />
        //         </Suspense>
        //     </div>
        // </div>
        <AppointmentManagement />
    );
}