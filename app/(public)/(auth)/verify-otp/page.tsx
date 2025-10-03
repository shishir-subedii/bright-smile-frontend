import OTPForm from "@/components/auth/OTPForm";
import { getCookie } from "@/lib/utils/cookieHelper";
import Link from "next/link";

export default async function VerifyOTPPage() {
    const tempToken = await getCookie("tempToken");

    if (!tempToken) {
        return (
            <div className="flex justify-center py-20 bg-gray-50 px-4">
                <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg text-center">
                    <p className="text-gray-600">
                        No verification token found or expired. Please register again.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/register"
                            className="text-primary hover:underline font-medium"
                        >
                            Go to Registration
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center py-20 bg-gray-50 px-4">
            <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg">
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Verify Your Account
                    </h2>
                    <p className="text-gray-600">
                        We&apos;ve sent a one-time password (OTP) to your email. Please
                        check your inbox and enter it below. This OTP is valid for 10
                        minutes.
                    </p>
                </header>
                <OTPForm />
            </div>
        </div>
    );
}
