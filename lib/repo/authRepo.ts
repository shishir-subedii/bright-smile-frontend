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
    const result = await apiClient.post("/auth/register", data);
    if (result.error) {
        return { success: false, message: result.error.message };
    }
    return result.data;
}

export async function verifyOtp(data: VerifyOtpData): Promise<any> {
    const result = await apiClient.post("/auth/verify-otp", data);
    if (result.error) {
        return { success: false, message: result.error.message };
    }
    return result.data;
}