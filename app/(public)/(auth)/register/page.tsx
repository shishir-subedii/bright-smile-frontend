import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: "Register - BrightSmile",
    description: "Create an account to access BrightSmile's features.",
    keywords: ["register", "signup", "create account", "BrightSmile"],
};

export default function RegisterPage() {
    return (
        <div className="flex justify-center py-20 bg-gray-50 px-4">
            <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-lg">
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Your Bright Smile Account
                    </h2>
                    <p className="text-gray-600">
                        Join us for a healthier, happier smile!
                    </p>
                </header>
                <RegisterForm />
            </div>
        </div>
    );
}
