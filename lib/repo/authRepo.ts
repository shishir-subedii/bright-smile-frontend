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

interface LoginData {
    email: string;
    password: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export async function register(data: RegisterData): Promise<ApiResponse> {
    const result = await apiClient.post("/auth/register", data);
    return result.error ? { success: false, message: result.error.message } : { success: true, data: result.data, message: "User registered successfully" };
}

export async function verifyOtp(data: VerifyOtpData): Promise<ApiResponse> {
    const result = await apiClient.post("/auth/verify-otp", data);
    return result.error ? { success: false, message: result.error.message } : { success: true, data: result.data, message: "OTP verified successfully" };
}

export async function login(data: LoginData): Promise<ApiResponse> {
    const result = await apiClient.post("/auth/login", data);
    console.log('login result', result);
    return result.error ? { success: false, message: result.error.message } : { success: true, data: result.data, message: "Login successful" };
}