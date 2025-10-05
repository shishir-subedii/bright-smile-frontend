import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentGuidePage() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#1F2937]">
                            Payment Guide
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Introduction</h2>
                            <p>
                                Bright Smile is a hobby project and does not process real payments. To test the payment functionality, please use the provided test credentials for Stripe and eSewa. Do not enter real payment information, as it will not be processed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Stripe Test Credentials</h2>
                            <p>
                                Use the following test card details for Stripe payments:
                            </p>
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>Card Number</strong>: 4242 4242 4242 4242</li>
                                <li><strong>Expiry Date</strong>: Any future date (e.g., 12/34)</li>
                                <li><strong>CVC</strong>: Any 3-digit number (e.g., 123)</li>
                                <li><strong>ZIP</strong>: Any 5-digit number (e.g., 12345)</li>
                            </ul>
                            <p className="mt-2">
                                For other test scenarios (e.g., declined payments), refer to{' '}
                                <a
                                    href="https://stripe.com/docs/testing"
                                    className="text-[#00BCD4] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Stripe's testing documentation
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">eSewa Test Credentials</h2>
                            <p>
                                Use the following test credentials for eSewa payments:
                            </p>
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>eSewa ID</strong>: 9806800001/2/3/4/5</li>
                                <li><strong>Password</strong>: Nepal@123</li>
                                <li><strong>Token</strong>: 123456</li>
                            </ul>
                            <p className="mt-2">
                                For more details on eSewa testing, visit{' '}
                                <a
                                    href="https://developer.esewa.com.np"
                                    className="text-[#00BCD4] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    eSewa’s developer documentation
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Testing Payments</h2>
                            <p>
                                To test payments, navigate to the profile page, select an appointment with an "Unpaid" status, and click "Pay Now." Use the test credentials above to simulate a payment. The system will redirect to a success or failure page based on the test outcome.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Important Notes</h2>
                            <p>
                                Bright Smile is a demonstration project. All payment interactions are simulated, and no real transactions are processed. Do not use real payment information.
                            </p>
                        </section>

                        <div className="mt-6">
                            <Button
                                asChild
                                className="bg-[#00BCD4] hover:bg-cyan-700 text-white"
                            >
                                <a href="/profile">Back to Profile</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}