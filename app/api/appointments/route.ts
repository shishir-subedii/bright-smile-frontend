import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { getCookie } from "@/lib/utils/cookieHelper";

export async function POST(req: NextRequest) {
    if(!await getCookie('accessToken')) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json();
        console.log("Received appointment booking request:", body);

        // Call backend to create the appointment
        const result = await apiServer.post("/appointments", body);
        console.log("Appointment creation result:", result);

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") || "10";
        const page = searchParams.get("page") || "1";

        const result = await apiServer.get(`/appointments?limit=${limit}&page=${page}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}
