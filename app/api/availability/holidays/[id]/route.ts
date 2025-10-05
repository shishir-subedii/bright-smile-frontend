import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

interface Params {
    id: string;
}

// Remove Holiday
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Holiday ID is required" },
                { status: 400 }
            );
        }

        const result = await apiServer.delete(`/availability/holidays/${id}`);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
