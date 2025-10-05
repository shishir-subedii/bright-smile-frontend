import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setCookie } from "@/lib/utils/cookieHelper";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (!token || !role) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    await setCookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    await setCookie("role", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    await setCookie("authProvider", 'GOOGLE' , {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    // Redirect to dashboard or wherever you want
    return NextResponse.redirect(new URL("/", req.url));
}
