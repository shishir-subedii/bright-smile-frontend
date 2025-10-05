import { Doctor } from "@/types";
import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";

class DoctorRepo {
    constructor() { }

    async getAllDoctors({
        onSuccess,
        onError
    }: {
        onSuccess: (data: Doctor[]) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get("/doctors");
            if (success && data) {
                onSuccess(data as Doctor[]);
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
        onSuccess: (data: Doctor) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/doctors/${id}`);
            if (success && data) {
                onSuccess(data as Doctor);
            } else {
                onError(message || "Failed to fetch doctor details");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async addDoctor({
        payload,
        onSuccess,
        onError,
    }: {
        payload: Partial<Doctor>;
        onSuccess: (data: Doctor) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/doctors', payload);
            if (success && data) {
                onSuccess(data as Doctor);
            } else {
                onError(message || "Failed to add doctor");
            }
        } catch (error: unknown) {
            const errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async updateDoctor({
        id,
        payload,
        onSuccess,
        onError,
    }: {
        id: string;
        payload: Partial<Doctor>;
        onSuccess: (data: Doctor) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.patch(`/doctors/${id}`, payload);
            if (success && data) {
                onSuccess(data as Doctor);
            } else {
                onError(message || "Failed to update doctor");
            }
        } catch (error: unknown) {
            const errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async deleteDoctor({
        id,
        onSuccess,
        onError,
    }: {
        id: string;
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete(`/doctors/${id}`);
            if (success) {
                onSuccess(message || "Doctor deleted successfully");
            } else {
                onError(message || "Failed to delete doctor");
            }
        } catch (error: unknown) {
            const errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const doctorRepo = new DoctorRepo();
