'use client';

import { useEffect } from 'react';
import { useAuthStore } from './authStore'; // your Zustand file

export function AuthInitializer() {
    const { addLogin, clearLogin } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/status', { cache: 'no-store' });
                const data = await res.json();

                if (data.isLoggedIn) {
                    addLogin(data.authProvider || 'UNKNOWN');
                } else {
                    clearLogin();
                }
            } catch (error) {
                clearLogin();
            }
        };

        checkAuth();
    }, [addLogin, clearLogin]);

    return null; // no UI
}
