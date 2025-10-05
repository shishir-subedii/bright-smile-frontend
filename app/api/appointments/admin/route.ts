import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { withRole } from "@/lib/middleware/withRole";

export const GET = withRole(['ADMIN'], async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") || "10";
        const page = searchParams.get("page") || "1";

        console.log(`Fetching admin appointments: limit=${limit}, page=${page}`);

        const result = await apiServer.get(`/appointments/all/admin?limit=${limit}&page=${page}`);
        console.log(`Admin appointments fetched successfully:`, result);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
});
