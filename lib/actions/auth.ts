"use server";

import { redirect } from "next/navigation";
import { register, verifyOtp, login } from "@/lib/repo/authRepo";
import { setCookie, deleteCookie, getCookie } from "@/utils/cookieHelper";

interface FormState {
    success: boolean;
    message?: string;
}

export async function registerAction(state: FormState, formData: FormData): Promise<FormState> {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    const response = await register(data);
    if (response.success && response.data?.tempToken) {
        await setCookie("tempToken", response.data.tempToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        redirect("/verify-otp");
    }
    return { success: false, message: response.message || "Registration failed" };
}

export async function verifyOtpAction(state: FormState, formData: FormData): Promise<FormState> {
    const otp = formData.get("otp") as string;
    const tempToken = await getCookie("tempToken");

    if (!tempToken) {
        return { success: false, message: "No temporary token found" };
    }

    const response = await verifyOtp({ otp, token: tempToken });
    if (response.success && response.data?.token) {
        await setCookie("token", response.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        await deleteCookie("tempToken");
        redirect("/login");
    }
    return { success: false, message: response.message || "OTP verification failed" };
}

export async function loginAction(state: FormState, formData: FormData): Promise<FormState> {
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const response = await login(data);
    console.log('response', response);
    if (response.success) {
        await setCookie("token", response.data.accessToken);
        await setCookie("role", response.data.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        await setCookie("authProvider", response.data.authProvider, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        // redirect("/dashboard");
        return { success: response.success, message: response.message };
    }
    return { success: false, message: response.message || "Login failed" };
}

export async function logoutAction() {
    await deleteCookie("token");
    await deleteCookie("role");
    await deleteCookie("authProvider");
    redirect("/");
}