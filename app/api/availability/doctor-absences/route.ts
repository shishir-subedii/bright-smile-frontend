import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

// Add Doctor Absence
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await apiServer.post("/availability/doctor-absences", body); // Call backend
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
