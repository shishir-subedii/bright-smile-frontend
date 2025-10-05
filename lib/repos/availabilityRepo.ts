import { handleApiError } from "@/lib/utils/errorHandler";
import { apiClient } from "../api/client/apiClient";

class AvailabilityRepo {
    async getHolidays(
        {
            onSuccess,
            onError,
        }: {
            onSuccess: (data: any) => void;
            onError: (message: string) => void;
        }
    ) {
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
}

export const availabilityRepo = new AvailabilityRepo();
