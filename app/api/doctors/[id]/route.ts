import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export interface idParams {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: idParams }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Doctor ID is required" },
                { status: 400 }
            );
        }

        const result = await apiServer.get(`/doctors/${id}`); // Call backend
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
