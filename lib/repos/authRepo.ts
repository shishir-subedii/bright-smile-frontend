import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";

class AuthRepo {
    constructor() { }

    async register({
        data: payload,
        onSuccess,
        onError
    }: {
        data: {
            name: string, email: string, password: string, confirmPassword: string, 
        },
        onSuccess: (message: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/register', payload);
            if (success && data) {
                onSuccess(message);
            } else {
                onError(message || "Failed to register user");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async verifyOTP({   
        data: payload,
        onSuccess,
        onError
    }: {
        data: {
            otp: string
        },
        onSuccess: (data: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/verify-otp', payload);
            if (success && data) {
                onSuccess(message || 'OTP verified successfully');
            }
            else {
                onError(message || "Failed to verify OTP");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }


    async login({
        data: payload,
        onSuccess,
        onError
    }: {
        data: {
            email: string, password: string
        },
        onSuccess: (data: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/login', payload);
            if (success && data) {
                onSuccess(data || 'Login successful');
            } else {
                onError(message || "Failed to fetch user profile");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async logout({
        onSuccess,
        onError
    }: {
        onSuccess: (message: string) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, message } = await apiClient.get('/auth/logout');
            if (success) {
                onSuccess(message || 'Logout successful');
            } else {
                onError(message || "Failed to logout");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}
export const authRepo = new AuthRepo();