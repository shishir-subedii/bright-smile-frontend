import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

interface Params {
    id: string;
}

// Remove Doctor Absence
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Absence ID is required" },
                { status: 400 }
            );
        }

        const result = await apiServer.delete(`/availability/doctor-absences/${id}`);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
