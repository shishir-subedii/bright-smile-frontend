import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    isLoggedIn: boolean | null;
    authProvider: string | null;
    addLogin: (authProvider: string) => void;
    clearLogin: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: null,
            authProvider: null,
            addLogin: (authProvider) => set({ authProvider, isLoggedIn: true }),
            clearLogin: () => set({ isLoggedIn: false, authProvider: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);