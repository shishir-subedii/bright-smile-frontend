"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/lib/actions/auth";
import Link from "next/link";
import GoogleAuthButton from "@/components/common/GoogleAuthButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormState {
    success: boolean;
    message?: string;
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction] = useActionState<FormState, FormData>(loginAction, { success: true, message: "" });
    const { pending } = useFormStatus();
    const router = useRouter();

    useEffect(() => {
        console.log('state', state);
        if (state.message && !state.success) {
            toast.error(state.message, { icon: "❌" });
        }
        else if(state.message && state.success){
            toast.success(state.message, { icon: "✅" });
            router.push("/dashboard");
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    className="w-full transition duration-200"
                    required
                    disabled={pending}
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </Label>
                    <Link href="#" className="text-sm text-cyan-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        className="w-full pr-10 transition duration-200"
                        required
                        disabled={pending}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={pending}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pending}
            >
                {pending ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                        </svg>
                        Loading...
                    </span>
                ) : (
                    "Login"
                )}
            </Button>

            <div className="flex items-center">
                <Separator className="flex-grow" />
                <span className="flex-shrink mx-4 text-gray-500">OR</span>
                <Separator className="flex-grow" />
            </div>

            <GoogleAuthButton />

            <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-cyan-600 hover:underline font-medium">
                    Register
                </Link>
            </div>
        </form>
    );
}