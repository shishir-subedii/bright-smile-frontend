import { appointmentFormData, paymentMethod } from "@/types";
import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";
import { paymentRepo } from "./paymentRepo";

class AppointmentRepo {
    constructor() { }
    private readonly paymentRepo = paymentRepo;
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
            const { success, data, message } = await apiClient.post('/appointments', payload);
            console.log("API Response:", { success, data, message });
            if (payload.pay === paymentMethod.CASH) {
                if (success) {
                    onSuccess(message || "Appointment booked successfully!");
                }
            }
            if (success && data) {
                console.log("Appointment booked:", data);
                if (payload.pay === paymentMethod.ESEWA) {
                    this.paymentRepo.initiateEsewaPayment({
                        appointmentId: data.id,
                        onSuccess: (url: string) => onSuccess(url),
                        onError: (err: string) => onError(err || "Failed to initiate eSewa payment")
                    });
                }
            } if (!success) {
                onError(message || "Failed to book appointment");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }


}
export const appointmentRepo = new AppointmentRepo();