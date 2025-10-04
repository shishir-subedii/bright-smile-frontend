import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;   // await it

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Appointment ID is required" },
                { status: 400 }
            );
        }

        const result = await apiServer.post(`/payments/stripe/checkout/${id}`);

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
