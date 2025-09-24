import RegisterForm from "@/components/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RegisterPage() {
    return (
        <Card className="w-full max-w-md overflow-hidden">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Create Your Bright Smile Account</CardTitle>
                <CardDescription className="text-gray-600">Join us for a healthier, happier smile!</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <RegisterForm />
            </CardContent>
        </Card>
    );
}