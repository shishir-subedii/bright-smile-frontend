import RegisterForm from "@/components/appointment/RegisterForm";

export const metadata = {
    title: "Book Appointment - Bright Smile Dental Clinic",
    description: "Schedule your appointment with Bright Smile Dental Clinic. Fill out the form to book your visit.",
};

export default function RegisterPage() {
    return (
        <main className="flex-grow container mx-auto px-6 py-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Bright Smile Appointment</h2>
                    <p className="text-gray-600">Please provide your details and select a preferred doctor.</p>
                </div>
                <RegisterForm>
                </RegisterForm>
            </div>
        </main>
    );
}