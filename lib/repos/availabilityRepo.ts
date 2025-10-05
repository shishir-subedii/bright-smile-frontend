import { handleApiError } from "@/lib/utils/errorHandler";
import { apiClient } from "../api/client/apiClient";

class AvailabilityRepo {
    async getHolidays({
        onSuccess,
        onError,
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/availability/holidays/`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch holidays");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async addHoliday({
        payloadData,
        onSuccess,
        onError,
    }: {
        payloadData: { date: string; reason: string; isRecurring?: boolean };
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.post(`/availability/holidays`, payloadData);
            if (success) {
                onSuccess(message || "Holiday added successfully");
            } else {
                onError(message || "Failed to add holiday");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async removeHoliday({
        id,
        onSuccess,
        onError,
    }: {
        id: string;
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete(`/availability/holidays/${id}`);
            if (success) {
                onSuccess(message || "Holiday removed successfully");
            } else {
                onError(message || "Failed to remove holiday");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async addDoctorAbsence({
        payloadData,
        onSuccess,
        onError,
    }: {
        payloadData: {
            doctorId: string;
            date: string;
            fromTime: string;
            toTime: string;
            reason?: string;
        };
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.post(`/availability/doctor-absences`, payloadData);
            if (success) {
                onSuccess(message || "Doctor absence added successfully");
            } else {
                onError(message || "Failed to add doctor absence");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async removeDoctorAbsence({
        id,
        onSuccess,
        onError,
    }: {
        id: string;
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete(`/availability/doctor-absences/${id}`);
            if (success) {
                onSuccess(message || "Doctor absence removed successfully");
            } else {
                onError(message || "Failed to remove doctor absence");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async getDoctorAbsences({
        id,
        date,
        onSuccess,
        onError,
    }: {
        id: string;
        date: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/availability/doctor-absences/${id}/${date}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch doctor absences");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const availabilityRepo = new AvailabilityRepo();
