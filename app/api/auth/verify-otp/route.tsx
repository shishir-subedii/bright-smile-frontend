import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/lib/utils/cookieHelper";
import { handleApiError } from "@/lib/utils/errorHandler";
import { apiServer } from "@/lib/api/server/apiServer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Read TempToken from cookie
        const tempToken = await getCookie("tempToken");

        if (!tempToken) {
            return NextResponse.json(
                { success: false, message: "TempToken not found" },
                { status: 401 }
            );
        }

        // Send TempToken in the request body to backend
        const result = await apiServer.post("/auth/verify-otp", {
            ...body,
            tempToken, // include the token here
        });

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
