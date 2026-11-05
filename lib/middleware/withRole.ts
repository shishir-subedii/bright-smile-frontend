import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '../utils/cookieHelper';

type RouteContext = {
    params: Promise<Record<string, string>>;
};

export function withRole<T extends (req: NextRequest, context: any) => any>(
    allowedRoles: string[],
    handler: T
) {
    type HandlerContext = Parameters<T>[1] extends undefined ? RouteContext : Parameters<T>[1];

    return async (req: NextRequest, context: HandlerContext): Promise<Awaited<ReturnType<T>>> => {
        try {
            const role = await getCookie('role');
            console.log('User role from cookie:', role); // Debug log

            if (!role || !allowedRoles.includes(role)) {
                return NextResponse.json(
                    { success: false, message: 'Unauthorized' },
                    { status: 401 }
                ) as Awaited<ReturnType<T>>;
            }

            // Forward both req and context
            return await handler(req, context as Parameters<T>[1]);
        } catch (error) {
            return NextResponse.json(
                { success: false, message: 'Error verifying role' },
                { status: 500 }
            ) as Awaited<ReturnType<T>>;
        }
    };
}
