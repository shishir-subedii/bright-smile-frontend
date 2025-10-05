import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

interface Params {
    id: string;
    date: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const { id, date } = params;

    if (!id || !date) {
        return NextResponse.json(
            { success: false, message: "Missing doctor ID or date" },
            { status: 400 }
        );
    }

    try {
        // Call backend API for this doctor and date
        const result = await apiServer.get(`/availability/doctor-absences/${id}/${date}`);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
