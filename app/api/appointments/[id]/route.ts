import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export interface idParams {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: idParams }) {
    try {
        const { id } = params;
        const result = await apiServer.get(`/appointments/${id}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
