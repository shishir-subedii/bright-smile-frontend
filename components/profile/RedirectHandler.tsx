'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHandler() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/profile');
        }, 4000);

        return () => clearTimeout(timer);
    }, [router]);

    return null;
}