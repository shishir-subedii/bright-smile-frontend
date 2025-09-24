import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import OtpForm from "@/components/OtpForm";

export default function VerifyOtpPage() {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Verify Your Account</CardTitle>
        <CardDescription className="text-gray-600">
          We've sent a one-time password (OTP) to your email. Please check your inbox and enter it below. This OTP is valid for 10 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <OtpForm />
      </CardContent>
    </Card>
  );
}