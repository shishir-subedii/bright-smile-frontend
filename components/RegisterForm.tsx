"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { registerAction } from "@/lib/actions/auth";
import Link from "next/link";
import GoogleAuthButton from "@/components/common/GoogleAuthButton";
import { toast } from "sonner";

interface FormState {
    success: boolean;
    message?: string;
}

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [state, formAction] = useActionState<FormState, FormData>(registerAction, { success: true, message: "" });
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.message && !state.success) {
            toast.error(state.message);
        } else if (state.success && state.message) {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full transition duration-200"
                    required
                    disabled={pending}
                />
            </div>

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
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </Label>
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

            <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </Label>
                <div className="relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="w-full pr-10 transition duration-200"
                        required
                        disabled={pending}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={pending}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex items-start">
                <Checkbox id="terms" name="terms" required disabled={pending} />
                <Label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <Link href="#" className="text-cyan-600 hover:underline">
                        Bright Smile Terms & Conditions
                    </Link>
                </Label>
            </div>

            <Button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pending}
            >
                {pending ? "Loading..." : "Register"}
            </Button>

            <div className="flex items-center">
                <Separator className="flex-grow" />
                <span className="flex-shrink mx-4 text-gray-500"></span>
                <Separator className="flex-grow" />
            </div>

            <GoogleAuthButton />

            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-600 hover:underline font-medium">
                    Login
                </Link>
            </div>
        </form>
    );
}