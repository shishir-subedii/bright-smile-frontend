"use client";

import Image from "next/image";
import { useState } from "react";

const doctors = [
    {
        id: "1",
        name: "Dr. Amelia Chen",
        specialty: "General Dentist",
        image: "https://images.unsplash.com/photo-1588776814546-38e77d94de06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHww&ixlib=rb-4.0.3&q=80&w=400",
        alt: "Dr. Amelia Chen",
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        specialty: "Orthodontist",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHww&ixlib=rb-4.0.3&q=80&w=400",
        alt: "Dr. James Wilson",
    },
    {
        id: "3",
        name: "Dr. Sarah Johnson",
        specialty: "Pediatric Dentist",
        image: "https://images.unsplash.com/photo-1603398938378-99f817ef786b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHww&ixlib=rb-4.0.3&q=80&w=400",
        alt: "Dr. Sarah Johnson",
    },
    {
        id: "4",
        name: "Dr. Michael Brown",
        specialty: "Oral Surgeon",
        image: "https://images.unsplash.com/photo-1611691541355-9c8c214093c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9jdG9yfHww&ixlib=rb-4.0.3&q=80&w=400",
        alt: "Dr. Michael Brown",
    },
];


interface DoctorSelectionProps {
    onSelectDoctor?: (doctorId: string) => void;
}

export default function DoctorSelection({ onSelectDoctor }: DoctorSelectionProps) {
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");

    const handleDoctorClick = (doctorId: string) => {
        setSelectedDoctor(doctorId);
        if (onSelectDoctor) {
            onSelectDoctor(doctorId);
        }
    };

    return (
        <div className="mb-12" id="step-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">1. Choose Your Doctor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className={`p-4 rounded-lg border-2 bg-gray-50 cursor-pointer transition-all ${selectedDoctor === doctor.id
                                ? "border-[#00BCD4] shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                                : "border-transparent"
                            }`}
                        onClick={() => handleDoctorClick(doctor.id)}
                    >
                        <div className="flex flex-col items-center">
                            <Image
                                src={doctor.image}
                                alt={doctor.alt}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full object-cover mb-3"
                            />
                            <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>
            <input type="hidden" id="doctorId" name="doctorId" value={selectedDoctor} />
        </div>
    );
}