import { handleApiError } from "@/lib/utils/errorHandler";
import { apiClient } from "../api/client/apiClient";

class PaymentRepo {
    async initiateEsewaPayment(
        {
            appointmentId,
            onError,
        }: {
            appointmentId: string,
            onError: (err: string) => void;
        } 
    ) {
        try {
            const { success, data, message } = await apiClient.post(`/payments/esewa/initiate/${appointmentId}`);
            if (success && data) {
                window.location.href = data.paymentUrl;
            } else {
                onError(message || "Failed to initiate eSewa payment");
            }
        } catch (error: unknown) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const paymentRepo = new PaymentRepo();
