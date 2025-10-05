"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { LoginFormData } from "@/types";
import GoogleSignInButton from "./GoogleSignInButton";
import PasswordInput from "./PasswordInput";
import { authRepo } from "@/lib/repos/authRepo";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";

export default function LoginForm() {

    const { addLogin } = useAuthStore();
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        await authRepo.login({
            data: {
                email: formData.email,
                password: formData.password,
            },
            onSuccess: (message: any) => {
                toast.success("Login successful");
                addLogin(message.authProvider as string)
                if(message.isAdmin){
                    router.push("/admin");
                }
                else {
                router.push("/");
                }
            },
            onError: (message) => {
                toast.error(message);
            },
        });
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="email" className="mb-1">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                />
            </div>

            <div>
                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <div className="text-right mt-1">
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <GoogleSignInButton />

            <p className="text-center text-sm text-gray-600 mt-6">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="text-primary font-medium hover:underline"
                >
                    Register
                </Link>
            </p>
        </form>
    );
}
