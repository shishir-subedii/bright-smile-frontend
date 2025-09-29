'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = ['home', 'services', 'why-us', 'testimonials', 'contact', 'doctors'];

    const formatHref = (link: string) => {
        if (link === 'home') return '/';
        if (link === 'doctors') return '/#doctors';
        return `/#${link}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-cyan-600">
                        Bright Smile
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link}
                                href={formatHref(link)}
                                className="text-gray-700 hover:text-cyan-600 transition"
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </Link>
                        ))}
                    </nav>

                    <Link
                        href="/book-appointment"
                        className="hidden md:block bg-[#8BC34A] hover:bg-[#7CB342] text-white px-6 py-2 rounded-full transition transform hover:scale-105"
                    >
                        Book Appointment
                    </Link>

                    {/* Mobile menu toggle */}
                    <Button
                        variant="ghost"
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu />
                    </Button>
                </div>

                {/* Mobile menu */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-4`}>
                    {links.map((link) => (
                        <Link
                            key={link}
                            href={formatHref(link)}
                            className="block text-gray-700 hover:text-cyan-600 transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                        </Link>
                    ))}

                    <Link
                        href="/book-appointment"
                        className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white px-6 py-2 rounded-full transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Appointment
                    </Link>
                </div>
            </div>
        </header>
    );
}
