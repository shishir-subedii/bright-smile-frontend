"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { appointmentRepo } from "@/lib/repos/appointmentRepo";
import { appointmentFormData, paymentMethod } from "@/types";
import DoctorSelection from "@/components/appointment/DoctorSelection";
import AppointmentDetails from "@/components/appointment/AppointmentDetails";
import PersonalDetails from "@/components/appointment/PersonalDetails";
import PaymentMethod from "@/components/appointment/PaymentMethod";
import { useRouter } from "next/navigation";

export default function RegisterForm({ children }: { children?: React.ReactNode }) {
    const [formData, setFormData] = useState<appointmentFormData>({
        doctorId: "",
        date: "",
        time: "",
        age: Number(""),
        gender: "",
        phoneNumber: "",
        pay: paymentMethod.CASH,
    });

    const [countryCode, setCountryCode] = useState("+977");
    const [loading, setLoading] = useState(false); //  loading state

    const updateField = (field: keyof appointmentFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCheckSchedule = () => {
        if (!formData.doctorId) {
            toast.error("Please select a doctor first");
            return;
        }
        toast.info(`Checking schedule for doctor ID: ${formData.doctorId}`);
    };

    const handleFindAvailable = () => {
        if (!formData.date) {
            toast.error("Please select a date first");
            return;
        }
        toast.info(`Finding doctors available on ${formData.date}`);
    };

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.doctorId) {
            toast.error("Please select a doctor");
            return;
        }

        const payload: appointmentFormData = {
            ...formData,
            phoneNumber: `${countryCode}${formData.phoneNumber}`,
        };

        setLoading(true); //  start loading
        try {
            await appointmentRepo.bookAppointment({
                payloadData: payload,
                onSuccess: (url) =>
                    payload.pay === paymentMethod.CASH
                        ? (
                            toast.success(url),
                            router.push("/profile")
                            
                    )
                        : (window.location.href = url),
                onError: (msg) =>
                    toast.error(msg || "Something went wrong booking appointment"),
            });
        } catch (err) {
            toast.error("Something went wrong booking appointment");
        } finally {
            setLoading(false); //  stop loading
        }
    };

    return (
        <form id="appointment-form" onSubmit={handleSubmit} className="space-y-12">
            <DoctorSelection onSelectDoctor={(doctorId: string) => updateField("doctorId", doctorId)} />
            <AppointmentDetails formData={formData} updateField={updateField} />
            <PersonalDetails
                formData={formData}
                updateField={updateField}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
            />
            <PaymentMethod formData={formData} updateField={updateField} />
            {children}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                    type="button"
                    onClick={handleCheckSchedule}
                    className="bg-[#00BCD4] hover:bg-[#0097A7] text-white font-bold py-3 px-4 rounded-lg transition"
                >
                    <Calendar className="inline mr-2 h-5 w-5" />
                    Check Doctor Schedule
                </Button>
                <Button
                    type="button"
                    onClick={handleFindAvailable}
                    className="bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold py-3 px-4 rounded-lg transition"
                >
                    <Search className="inline mr-2 h-5 w-5" />
                    Find Available Doctors
                </Button>
            </div>
            <Button
                type="submit"
                disabled={loading} //  disable when loading
                className={`w-full cursor-pointer bg-[#8BC34A] hover:bg-[#7CB342] text-white font-bold py-4 px-6 rounded-lg text-lg transition transform ${loading ? "opacity-70 cursor-not-allowed hover:scale-100" : "hover:scale-105"
                    }`}
            >
                {loading ? "Booking..." : "Confirm Appointment"} {/*  dynamic text */}
            </Button>
        </form>
    );
}
