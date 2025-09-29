import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex justify-center py-20 bg-gray-50 px-4">
            <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg">
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Login to book your next appointment!</p>
                </header>
                <LoginForm />
            </div>
        </div>
    );
}
