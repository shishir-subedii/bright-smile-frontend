import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '../utils/cookieHelper';

export function withRole<T extends (req: NextRequest, context: any) => any>(
    allowedRoles: string[],
    handler: T
) {
    return async (req: NextRequest, context: Parameters<T>[1]): Promise<ReturnType<T>> => {
        try {
            const role = await getCookie('role');
            console.log('User role from cookie:', role); // Debug log

            if (!role || !allowedRoles.includes(role)) {
                return NextResponse.json(
                    { success: false, message: 'Unauthorized' },
                    { status: 401 }
                ) as ReturnType<T>;
            }

            // Forward both req and context
            return await handler(req, context);
        } catch (error) {
            return NextResponse.json(
                { success: false, message: 'Error verifying role' },
                { status: 500 }
            ) as ReturnType<T>;
        }
    };
}
