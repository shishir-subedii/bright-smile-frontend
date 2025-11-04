import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { getCookie } from '@/lib/utils/cookieHelper';
import { redirect } from 'next/navigation';
import CountdownRedirect from '@/components/profile/CountdownRedirect';

export default async function PaymentSuccessPage() {
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
                            Payment Successful
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <CheckCircle className="w-16 h-16 text-[#00BCD4] mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                            Your payment has been processed successfully. You will be redirected to your profile in{' '}
                            <CountdownRedirect seconds={4} redirectTo="/profile" /> seconds.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
