import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";


class DoctorRepo {
    constructor() { }
    
    async getAllDoctors({
        onSuccess,
        onError
    }: {
        onSuccess: (message: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get('/doctors');
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch doctors");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async getDoctorById({
        id,
        onSuccess,
        onError
    }: {
        id: string;
        onSuccess: (message: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/doctors/${id}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch doctor details");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }  
}
export const doctorRepo = new DoctorRepo();