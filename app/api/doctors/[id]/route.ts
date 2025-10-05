import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/server/apiServer";
import { handleApiError } from "@/lib/utils/errorHandler";
import { withRole } from "@/lib/middleware/withRole";

export interface idParams {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: idParams }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Doctor ID is required" },
                { status: 400 }
            );
        }

        const result = await apiServer.get(`/doctors/${id}`); // Call backend
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
}

export const PATCH = withRole(['ADMIN'], async (req: NextRequest, { params }: { params: idParams }) => {
    try {
        const { id } = await Promise.resolve(params);
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Doctor ID is required" },
                { status: 400 }
            );
        }
        const body = await req.json();
        console.log(`PATCH /doctors/${id} body:`, body);
        const result = await apiServer.patch(`/doctors/${id}`, body);
        console.log(`PATCH /doctors/${id} result:`, result);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }
});

export const DELETE = withRole(['ADMIN'], async (req: NextRequest, { params }: { params: idParams }) => {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Doctor ID is required" },
                { status: 400 }
            );
        }
        const result = await apiServer.delete(`/doctors/${id}`);
        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: handleApiError(error) },
            { status: 500 }
        );
    }   
});

