import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import RedirectHandler from '@/components/profile/RedirectHandler';
import { getCookie } from '@/lib/utils/cookieHelper';
import { redirect } from 'next/navigation';

export default async function PaymentFailedPage() {
    const token = await getCookie('accessToken');

    if (!token) {
        redirect('/login');
    }
    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#1F2937] text-center">
                            Payment Failed
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                            Your payment could not be processed. Please try again. You will be redirected to your profile in 4 seconds.
                        </p>
                        <RedirectHandler />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}