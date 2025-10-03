import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

interface Params {
    appointmentId: string;
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {
        const { appointmentId } = params;
        if (!appointmentId) {
            return NextResponse.json(
                { success: false, message: "Appointment ID is required" },
                { status: 400 }
            );
        }

        const body = await req.json();

        // Call backend to initiate eSewa payment
        const result = await apiServer.post(`/payments/esewa/initiate/${appointmentId}`, body);

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
