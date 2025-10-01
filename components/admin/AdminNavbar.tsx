'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function AdminNavbar() {
    const router = useRouter();

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-bold text-cyan-500">Bright Smile Admin</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">Admin Panel</span>
                    <Button
                        variant="ghost"
                        className="text-white hover:text-cyan-400"
                        onClick={() => router.push('/')}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}