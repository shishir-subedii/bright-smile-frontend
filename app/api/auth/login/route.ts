import { apiServer } from "@/lib/api/server/apiServer";
import { setCookie } from "@/lib/utils/cookieHelper";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await apiServer.post("/auth/login", body);
        console.log("Login result:", result); // Debug log
        if (result.success) {
            await setCookie("accessToken", result.data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
            await setCookie("role", result.data.role, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
            await setCookie("authProvider", result.data.authProvider, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }
            return NextResponse.json(result);
        } catch (error: unknown) {
            return NextResponse.json(
                { success: false, message: handleApiError(error) }
            );
        }
    }
