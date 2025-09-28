"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { authRepo } from "@/lib/repos/authRepo";
import { useRouter } from "next/navigation";

export default function OTPForm() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }


        setLoading(true);
        await authRepo.verifyOTP({
            data: { otp },
            onSuccess: (message) => {
                toast.success(message as string);
                console.log("✅ OTP verified:", message);
                router.push("/login");
            },
            onError: (errMsg) => {
                toast.error(errMsg);
            },
        });
        setLoading(false);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setOtp(value);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="••••••"
                    className="w-48 text-center text-2xl tracking-widest"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Verifying..." : "Verify Account"}
            </Button>

            <div className="text-center">
                <Link
                    href="/register"
                    className="text-primary hover:underline font-medium"
                >
                    Try Again
                </Link>
            </div>
        </form>
    );
}
