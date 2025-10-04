"use client";

import { authRepo } from "@/lib/repos/authRepo";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, isLoading] = useState(false)
    const { clearLogin } = useAuthStore();
    const handleLogout = async () => {
        isLoading(true);
        try {
            await authRepo.logout(({
                onSuccess: (message: string) => {
                    toast.success(message || 'Logout Successful');
                    router.push('/login');
                },
                onError: (error) => {
                    toast.success('Logout Successful');
                    router.push('/login');
                }
            }))
            clearLogin()
            isLoading(false);
        } catch (err) {
            toast.error("Something went wrong");
            router.push('/login');
            clearLogin()
            isLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-md disabled:opacity-70 disabled:cursor-not-allowed hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
        >
            {loading ? "Please wait..." : "Logout"}
        </button>
    );
}
