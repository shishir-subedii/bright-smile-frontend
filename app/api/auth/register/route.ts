import { apiServer } from "@/lib/api/server/apiServer";
import { setCookie } from "@/lib/utils/cookieHelper";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await apiServer.post("/auth/register", body);
        if(result.success){
            await setCookie("tempToken", result.data.tempToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 10, // 10 minutes
            });
        }
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) }
        );
    }
}
