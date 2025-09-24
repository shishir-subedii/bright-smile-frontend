import apiClient from "@/lib/api/apiClient";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface VerifyOtpData {
    token: string;
    otp: string;
}

export async function register(data: RegisterData): Promise<any> {
    return apiClient.post("/auth/register", data);
}

export async function verifyOtp(data: VerifyOtpData): Promise<any> {
    return apiClient.post("/auth/verify-otp", data);
}