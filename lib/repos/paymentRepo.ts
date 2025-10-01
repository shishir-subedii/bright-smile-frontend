import { apiClient } from "../api/client/apiClient";
import { handleApiError } from "../utils/errorHandler";


class PaymentRepo {
    constructor() { }

    async initiateStripePayment({
        data: payload,
        onSuccess,
        onError
    }: {
        data: {appointmentId: string},
        onSuccess: (message: unknown) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.post('/appointments/book', payload);
            if (success && data) {
                onSuccess(message);
            } else {
                onError(message || "Failed to book appointment");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    
}
export const paymentRepo = new PaymentRepo();