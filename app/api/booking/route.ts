import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Call backend to create the appointment
        const result = await apiServer.post("/appointments", body);

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}