export function handleApiError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "Unexpected error occurred";
}

export function handleServerError(error: unknown): { success:boolean,  message: string } {
    let message = "An unexpected server error occurred";
    if (error instanceof Error) {
        message = error.message;
    }
    if (typeof error === "string") {
        message = error;
    }
    return {
        success: false,
        message
    };
}
