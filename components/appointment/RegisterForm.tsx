"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

interface FormData {
    doctorId: string;
    date: string;
    time: string;
    age: string;
    gender: string;
    countryCode: string;
    phoneNumber: string;
    pay: string;
}

export default function RegisterForm({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState<FormData>({
        doctorId: "",
        date: "",
        time: "",
        age: "",
        gender: "",
        countryCode: "+977",
        phoneNumber: "",
        pay: "",
    });

    const handleCheckSchedule = () => {
        if (!formData.doctorId) {
            toast.error("Please select a doctor first");
            return;
        }
        toast.info(`Checking schedule for selected doctor (ID: ${formData.doctorId})`);
    };

    const handleFindAvailable = () => {
        if (!formData.date) {
            toast.error("Please select a date first");
            return;
        }
        toast.info(`Finding doctors available on ${formData.date}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.doctorId) {
            toast.error("Please select a doctor");
            return;
        }
        toast.success("Appointment booked successfully!");
    };

    return (
        <form id="appointment-form" onSubmit={handleSubmit} className="space-y-12">
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
                className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white font-bold py-4 px-6 rounded-lg text-lg transition transform hover:scale-105"
            >
                Confirm Appointment
            </Button>
        </form>
    );
}