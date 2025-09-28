import OTPForm from "@/components/auth/OTPForm";
import { getCookie } from "@/lib/utils/cookieHelper";
import Link from "next/link";

export default async function VerifyOTPPage() {
    const tempToken = await getCookie("tempToken");
    if (!tempToken) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <p className="text-gray-600">
                    No verification token found or expired. Please register again.
                </p>
                <div className="text-left mt-4">
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Go to Registration
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
            <header className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Verify Your Account
                </h2>
                <p className="text-gray-600">
                    We&apos;ve sent a one-time password (OTP) to your email. Please check
                    your inbox and enter it below. This OTP is valid for 10 minutes.
                </p>
            </header>
            <OTPForm />
        </div>
    );
}