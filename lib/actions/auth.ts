"use server";

import { redirect } from "next/navigation";
import { register, verifyOtp } from "@/lib/repo/authRepo";
import { setCookie, deleteCookie } from "@/utils/cookieHelper";

export async function registerAction(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    try {
        const response = await register(data);
        if (response.success && response.data?.tempToken) {
            await setCookie("tempToken", response.data.tempToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            redirect("/verify-otp");
        } else {
            throw new Error(response.message || "Registration failed");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function verifyOtpAction(formData: FormData) {
    const otp = formData.get("otp") as string;
    const tempToken = await getCookie("tempToken");

    if (!tempToken) {
        throw new Error("No temporary token found");
    }

    try {
        const response = await verifyOtp({ otp, token: tempToken });
        if (response.success) {
            await setCookie("token", response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            await deleteCookie("tempToken");
            redirect("/login");
        } else {
            throw new Error(response.message || "OTP verification failed");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function logoutAction() {
    await deleteCookie("token");
    redirect("/");
}

import { getCookie } from "@/utils/cookieHelper";