import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { withRole } from "@/lib/middleware/withRole";

export async function GET(req: NextRequest) {
    try {
        const result = await apiServer.get("/doctors"); // Call backend
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}

export const POST = withRole(['ADMIN'], async (req: NextRequest) => {
    try {
        const body = await req.json();
        console.log('POST /doctors body:', body);
        const result = await apiServer.post('/doctors', body);
        console.log('POST /doctors result:', result);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
});