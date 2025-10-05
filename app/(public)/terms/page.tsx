import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#1F2937]">
                            Terms and Conditions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">1. Introduction</h2>
                            <p>
                                Welcome to Bright Smile, a hobby project created for educational and demonstration purposes. By accessing or using this website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">2. Disclaimer</h2>
                            <p>
                                Bright Smile is a non-commercial hobby project. The developer does not own any rights to the Bright Smile branding or claim any ownership over the concept. This project is not affiliated with any real-world dental service or organization. All information, including but not limited to user data, appointments, and payment details, is fictional and used solely for demonstration purposes. The developer is not responsible for any actions taken based on the use of this website, and no real payment information should be provided as it will not be processed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">3. Use of the Website</h2>
                            <div>
                                You may use Bright Smile for personal, non-commercial purposes only. You agree not to:
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Use the website for any illegal or unauthorized purpose.</li>
                                    <li>Attempt to gain unauthorized access to any part of the website.</li>
                                    <li>Modify, distribute, or reproduce any content without permission.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">4. Payment Information</h2>
                            <p>
                                Bright Smile includes payment-related features for demonstration purposes only. Do not enter real payment information, as it will not be processed. Use only the test credentials provided in the Payment Guide for testing payment flows. <Link href='/payment-test'><b>view test credentials page</b></Link>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">5. Limitation of Liability</h2>
                            <p>
                                The developer is not liable for any damages, losses, or issues arising from the use of Bright Smile. The website is provided "as is" without warranties of any kind, express or implied. All information listed, including appointment details and user data, is not accurate and should not be relied upon.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">6. Changes to Terms</h2>
                            <p>
                                These Terms and Conditions may be updated at any time without notice. Continued use of the website constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">7. Contact Information</h2>
                            <p>
                                For questions about these Terms and Conditions, please contact the developer at <a href="mailto:support@brightsmile.example.com" className="text-[#00BCD4] hover:underline">support@brightsmile.example.com</a>. this is fake email.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">8. Cookie Policy</h2>
                            <p>
                                Bright Smile uses cookies to enhance the user experience. By using the website, you consent to the use of cookies in accordance with our Privacy Policy.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}