import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <Card className="w-full max-w-md overflow-hidden">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">Login to book your next appointment!</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <LoginForm />
            </CardContent>
        </Card>
    );
}