import { Suspense } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import ScheduleManagement from '@/components/admin/ScheduleManagement';

export default function SchedulePage() {
    return (
        // <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        //     <Sidebar />
        //     <div className="flex-1 overflow-y-auto p-6">
        //         <Suspense fallback={<div>Loading...</div>}>
        //             <ScheduleManagement />
        //         </Suspense>
        //     </div>
        // </div>
        <ScheduleManagement />
    );
}