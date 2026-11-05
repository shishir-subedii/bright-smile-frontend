import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { withRole } from "@/lib/middleware/withRole";

export interface idParams {
    id: string;
}

export const PATCH = withRole(['ADMIN', 'USER'], async (req: NextRequest, { params }: { params: Promise<idParams> }) => {
    try {
        const { id } = await params;
        const result = await apiServer.patch(`/appointments/cancel/${id}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
});
