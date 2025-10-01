import { Suspense } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import UserManagement from '@/components/admin/UserManagement';

export default function UsersPage() {
    return (
        // <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        //     <Sidebar />
        //     <div className="flex-1 overflow-y-auto p-6">
        //         <Suspense fallback={<div>Loading...</div>}>
        //             <UserManagement />
        //         </Suspense>
        //     </div>
        // </div>
        <UserManagement />
    );
}