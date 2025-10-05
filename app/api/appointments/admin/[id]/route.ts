import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { withRole } from "@/lib/middleware/withRole";

export interface idParams {
    id: string;
}

export const GET = withRole(['ADMIN'], async (req: NextRequest, { params }: { params: idParams }) => {
    try {
        const { id } = params;
        const result = await apiServer.get(`/appointments/admin/${id}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
});
