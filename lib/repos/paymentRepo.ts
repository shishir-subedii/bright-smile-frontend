import { handleApiError } from "@/lib/utils/errorHandler";
import { apiClient } from "../api/client/apiClient";

class PaymentRepo {
    async initiateEsewaPayment(
        {
            appointmentId,
            onSuccess,
            onError,
        }: {
            appointmentId: string,
            onSuccess: (msg: string) => void;
            onError: (err: string) => void;
        } 
    ) {
        try {
            const { success, data, message } = await apiClient.post(`/payment/esewa/initiate/${appointmentId}`);
            console.log("eSewa initiation response:", { success, data, message });
            if (success && data) {
                onSuccess(data.paymentUrl);
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
