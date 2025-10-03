import { appointmentFormData, paymentMethod } from "@/types";
import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";
import { paymentRepo } from "./paymentRepo";

class AppointmentRepo {
    constructor() { }
    private readonly paymentRepo = paymentRepo;
    async bookAppointment({
        payloadData: payload,
        onError
    }: {
        payloadData: appointmentFormData,
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post('/appointments/book', payload);
            if (success && data) {
                if(payload.paymentMethod === paymentMethod.ESEWA) {
                    this.paymentRepo.initiateEsewaPayment({
                        appointmentId: data.id,
                        onError: (err: string) => onError(err)
                    });
                }
            } else {
                onError(message || "Failed to book appointment");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    
}
export const appointmentRepo = new AppointmentRepo();