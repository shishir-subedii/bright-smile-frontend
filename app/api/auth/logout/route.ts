import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "@/lib/utils/cookieHelper";
import { handleApiError } from "@/lib/utils/errorHandler";
import { apiServer } from "@/lib/api/server/apiServer";

export async function GET(req: NextRequest) {
    try {

        // Read TempToken from cookie
        const tempToken = await getCookie("accessToken");

        if (!tempToken) {
            return NextResponse.json(
                { success: false, message: "TempToken not found" },
                { status: 401 }
            );
        }

        // Send TempToken in the request body to backend
        const result = await apiServer.get("/auth/logout");
        await deleteCookie("accessToken");

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
