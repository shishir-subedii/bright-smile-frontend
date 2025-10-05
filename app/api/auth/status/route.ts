// app/api/auth/status/route.ts
import { getCookie } from "@/lib/utils/cookieHelper";
import { NextResponse } from "next/server";

export async function GET() {
    const accessToken = await getCookie("accessToken");
    const authProvider = await getCookie("authProvider");

    return NextResponse.json({
        isLoggedIn: !!accessToken,
        authProvider: authProvider || null,
    });
}
