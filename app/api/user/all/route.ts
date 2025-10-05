import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl;
        const page = url.searchParams.get("page") || "1";
        const limit = url.searchParams.get("limit") || "10";

        const result = await apiServer.get(`/user/all?page=${page}&limit=${limit}`);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
