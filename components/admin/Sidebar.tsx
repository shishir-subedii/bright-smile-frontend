'use client';

import { useState } from 'react';
import { Menu, X, LayoutDashboard, Stethoscope, Calendar, Clock, Users, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname() || '/admin'; // fallback

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { href: '/admin', label: 'Dashboard Home', icon: LayoutDashboard },
        { href: '/admin/doctors', label: 'Doctor Management', icon: Stethoscope },
        { href: '/admin/appointments', label: 'Appointment Management', icon: Calendar },
        { href: '/admin/schedule', label: 'Leave Management', icon: Clock },
        { href: '/admin/users', label: 'User Management', icon: Users },
    ];

    const handleNavClick = (href: string) => {
        router.push(href);
        if (window.innerWidth < 768) setIsOpen(false);
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed z-30 md:relative w-64 h-screen bg-gray-800 text-white transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo / Header */}
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-cyan-500">Bright Smile</h1>
                    <p className="text-gray-400 text-sm">Admin Dashboard</p>
                </div>

                {/* Nav + Logout separated */}
                <div className="flex flex-col h-[calc(100%-64px)]">
                    {/* Navigation links */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full flex items-center p-3 rounded-lg justify-start cursor-pointer ${pathname === item.href
                                                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        onClick={() => handleNavClick(item.href)}
                                    >
                                        <item.icon className="h-5 w-5 mr-3" />
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Logout pinned at bottom */}
                    <div className="p-4 border-t border-gray-700">
                        <Button
                            variant="ghost"
                            className="w-full flex items-center p-3 cursor-pointer mb-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => handleNavClick('/')}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mini Header for mobile */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md">
                <h1 className="text-lg font-semibold text-cyan-400">Bright Smile</h1>
                <Button
                    variant="ghost"
                    className="rounded-full bg-gray-600 p-2 shadow-md hover:bg-gray-500 text-white"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </header>

            {/* Add padding so content is not hidden behind header */}
            <div className="md:hidden h-14"></div>
        </>
    );
};

export default Sidebar;
