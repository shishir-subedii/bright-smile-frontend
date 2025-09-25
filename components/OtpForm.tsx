"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShieldCheck, RotateCcw } from "lucide-react";
import { verifyOtpAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormState {
    success: boolean;
    message?: string;
}

export default function OtpForm() {
    const [state, formAction] = useActionState<FormState, FormData>(verifyOtpAction, { success: true, message: "" });
    const { pending } = useFormStatus();
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                router.push("/login");
            } else {
                toast.error(state.message);
            }
        }
    }, [state, router]);

    return (
        <form action={formAction} className="space-y-6">
            <div className="flex justify-center">
                <ShieldCheck className="w-12 h-12 text-cyan-500 mb-4" />
            </div>

            <div>
                <Label htmlFor="otp" className="sr-only">
                    OTP Code
                </Label>
                <Input
                    type="tel"
                    id="otp"
                    name="otp"
                    maxLength={6}
                    placeholder="••••••"
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    disabled={pending}
                    ref={inputRef}
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pending}
            >
                {pending ? "Loading..." : "Verify Account"}
                {!pending && <ShieldCheck className="ml-2 w-5 h-5" />}
            </Button>

            <div className="text-center">
                <Link
                    href="/register"
                    className="text-cyan-500 hover:text-cyan-600 font-medium inline-flex items-center transition duration-200"
                >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Try Again
                </Link>
            </div>
        </form>
    );
}