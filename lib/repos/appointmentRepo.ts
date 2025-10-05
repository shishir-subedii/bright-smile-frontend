import { appointmentFormData } from "@/types";
import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";
import { paymentRepo } from "./paymentRepo";

class AppointmentRepo {
    constructor() { }
    private readonly paymentRepo = paymentRepo;

    //  Book Appointment
    async bookAppointment({
        payloadData: payload,
        onSuccess,
        onError
    }: {
        payloadData: appointmentFormData,
        onSuccess: (url: string) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post(`/appointments`, payload);
            if (payload.pay === "CASH") {
                return success
                    ? onSuccess(message || "Appointment booked successfully!")
                    : onError(message || "Failed to book appointment");
            }
            if (success && data) {
                if (payload.pay === "ESEWA") {
                    this.paymentRepo.initiateEsewaPayment({
                        appointmentId: data.id,
                        onSuccess,
                        onError: (err: string) => onError(err || "Failed to initiate eSewa payment")
                    });
                }
                if (payload.pay === "STRIPE") {
                    this.paymentRepo.initiateStripePayment({
                        appointmentId: data.id,
                        onSuccess,
                        onError: (err: string) => onError(err || "Failed to initiate Stripe payment")
                    });
                }
            } else {
                onError(message || "Failed to book appointment");
            }
        } catch (error: unknown) {
            onError(handleApiError(error));
        }
    }

    //  User Appointments
    async getUserAppointments({ limit = 10, page = 1, onSuccess, onError }: {
        limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments?limit=${limit}&page=${page}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch appointments");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  User Appointments by Status
    async getUserAppointmentsByStatus(status: string, { limit = 10, page = 1, onSuccess, onError }: {
        limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/user-status/${status}?limit=${limit}&page=${page}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch appointments by status");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Appointment by ID
    async getAppointmentById(id: string, { onSuccess, onError }: {
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/${id}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch appointment");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Admin: All Appointments
    async getAllAppointmentsAdmin({ limit = 10, page = 1, onSuccess, onError }: {
        limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/admin?limit=${limit}&page=${page}`);
            console.log(data);
            success ? onSuccess(data) : onError(message || "Failed to fetch all appointments (Admin)");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Admin: Appointment by ID
    async getAppointmentByIdAdmin(id: string, { onSuccess, onError }: {
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/admin/${id}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch appointment (Admin)");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Mark Completed
    async markAppointmentCompleted(id: string, { onSuccess, onError }: {
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.patch(`/appointments/complete/${id}`);
            success ? onSuccess(data) : onError(message || "Failed to mark appointment as completed");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Mark Cancelled
    async markAppointmentCancelled(id: string, { onSuccess, onError }: {
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.patch(`/appointments/cancel/${id}`);
            success ? onSuccess(data) : onError(message || "Failed to cancel appointment");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Doctor’s Appointments
    async getAppointmentsForDoctor(doctorId: string, { date = "", limit = 10, page = 1, onSuccess, onError }: {
        date?: string, limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/doctor/${doctorId}?date=${date}&limit=${limit}&page=${page}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch doctor appointments");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Admin: Appointments by Status
    async getAppointmentsByStatusAdmin(status: string, { limit = 10, page = 1, onSuccess, onError }: {
        limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/status/${status}?limit=${limit}&page=${page}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch appointments by status (Admin)");
        } catch (error) {
            onError(handleApiError(error));
        }
    }

    //  Today’s Appointments
    async getTodayAppointments({ limit = 10, page = 1, onSuccess, onError }: {
        limit?: number, page?: number,
        onSuccess: (data: any) => void,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/appointments/today?limit=${limit}&page=${page}`);
            success ? onSuccess(data) : onError(message || "Failed to fetch today's appointments");
        } catch (error) {
            onError(handleApiError(error));
        }
    }
}

export const appointmentRepo = new AppointmentRepo();
