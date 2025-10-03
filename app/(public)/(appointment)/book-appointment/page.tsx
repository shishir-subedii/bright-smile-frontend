import RegisterForm from "@/components/appointment/RegisterForm";
import DoctorSelection from "@/components/appointment/DoctorSelection";
import AppointmentDetails from "@/components/appointment/AppointmentDetails";
import PersonalDetails from "@/components/appointment/PersonalDetails";
import PaymentMethod from "@/components/appointment/PaymentMethod";

export default function RegisterPage() {
    return (
        <main className="flex-grow container mx-auto px-6 py-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Bright Smile Appointment</h2>
                    <p className="text-gray-600">Please provide your details and select a preferred doctor.</p>
                </div>
                <RegisterForm>
                    <DoctorSelection />
                    <AppointmentDetails />
                    <PersonalDetails />
                    <PaymentMethod />
                </RegisterForm>
            </div>
        </main>
    );
}