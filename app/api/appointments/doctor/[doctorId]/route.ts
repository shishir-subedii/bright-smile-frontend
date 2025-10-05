import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export interface doctorParams {
    doctorId: string;
}

export async function GET(req: NextRequest, { params }: { params: doctorParams }) {
    try {
        const { doctorId } = params;
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date") || "";
        const limit = searchParams.get("limit") || "10";
        const page = searchParams.get("page") || "1";

        const result = await apiServer.get(`/appointments/doctor/${doctorId}?date=${date}&limit=${limit}&page=${page}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
