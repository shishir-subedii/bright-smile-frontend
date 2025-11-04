'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CountdownRedirectProps {
    seconds: number;
    redirectTo: string;
}

export default function CountdownRedirect({ seconds, redirectTo }: CountdownRedirectProps) {
    const [count, setCount] = useState(seconds);
    const router = useRouter();

    useEffect(() => {
        if (count <= 0) {
            router.push(redirectTo);
            return;
        }

        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, router, redirectTo]);

    return <span>{count}</span>;
}
