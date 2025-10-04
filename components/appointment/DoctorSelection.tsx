// "use client";

// import { useEffect, useState } from "react";
// import { doctorRepo } from "@/lib/repos/doctorRepo";
// import { Doctor } from "@/types";
// import Loading from "../common/loaders/Loading";

// interface DoctorSelectionProps {
//     onSelectDoctor?: (doctorId: string) => void;
// }

// export default function DoctorSelection({ onSelectDoctor }: DoctorSelectionProps) {
//     const [doctors, setDoctors] = useState<Doctor[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedDoctor, setSelectedDoctor] = useState<string>("");

//     useEffect(() => {
//         doctorRepo.getAllDoctors({
//             onSuccess: (data: Doctor[]) => {
//                 setDoctors(data);
//                 setLoading(false);
//             },
//             onError: (err: string) => {
//                 setError(err);
//                 setLoading(false);
//             },
//         });
//     }, []);

//     const handleDoctorClick = (doctorId: string) => {
//         setSelectedDoctor(doctorId);
//         if (onSelectDoctor) {
//             onSelectDoctor(doctorId);
//         }
//     };

//     if (loading) return <Loading text="Loading doctors..." />;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="mb-12" id="step-1">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6">1. Choose Your Doctor</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {
//                 doctors.length === 0 && <p className="text-gray-600">No doctors available at the moment.</p>
//                 }
//                 {
//                 doctors.map((doctor) => (
//                     <div
//                         key={doctor.id}
//                         className={`p-4 rounded-lg border-2 bg-gray-50 cursor-pointer transition-all ${selectedDoctor === doctor.id
//                                 ? "border-[#00BCD4] shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
//                                 : "border-transparent"
//                             }`}
//                         onClick={() => handleDoctorClick(doctor.id.toString())}
//                     >
//                         <div className="flex flex-col items-center">
//                             <div className="w-20 h-20 rounded-full bg-[#00BCD4] flex items-center justify-center text-white font-bold text-lg mb-3">
//                                 {doctor.name
//                                     .split(" ")
//                                     .map((n) => n[0])
//                                     .join("")
//                                     .toUpperCase()}
//                             </div>
//                             <h4 className="font-medium text-gray-800">{doctor.name}</h4>
//                             <p className="text-sm text-gray-600">{doctor.specialization}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <input type="hidden" id="doctorId" name="doctorId" value={selectedDoctor} />
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { doctorRepo } from "@/lib/repos/doctorRepo";
import { Doctor } from "@/types";
import Loading from "../common/loaders/Loading";

interface DoctorSelectionProps {
    onSelectDoctor?: (doctorId: string) => void;
}

export default function DoctorSelection({ onSelectDoctor }: DoctorSelectionProps) {
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");

    //  Use TanStack Query to cache doctors
    const { data: doctors = [], isLoading, isError, error } = useQuery<Doctor[], Error>({
        queryKey: ["doctors"], // cache key
        queryFn: () =>
            new Promise<Doctor[]>((resolve, reject) => {
                doctorRepo.getAllDoctors({
                    onSuccess: (data) => resolve(data),
                    onError: (err) => reject(new Error(err)),
                });
            }),
        staleTime: 60 * 60 * 1000, //  cache for 1 hour
        retry: 1, // retry once on failure
    });

    const handleDoctorClick = (doctorId: string) => {
        setSelectedDoctor(doctorId);
        if (onSelectDoctor) {
            onSelectDoctor(doctorId);
        }
    };

    if (isLoading) return <Loading text="Loading doctors..." />;
    if (isError) return <p className="text-red-500">{(error as Error).message}</p>;

    return (
        <div className="mb-12" id="step-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">1. Choose Your Doctor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {doctors.length === 0 && (
                    <p className="text-gray-600">No doctors available at the moment.</p>
                )}
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className={`p-4 rounded-lg border-2 bg-gray-50 cursor-pointer transition-all ${selectedDoctor === doctor.id
                            ? "border-[#00BCD4] shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                            : "border-transparent"
                            }`}
                        onClick={() => handleDoctorClick(doctor.id.toString())}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#00BCD4] flex items-center justify-center text-white font-bold text-lg mb-3">
                                {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </div>
                            <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        </div>
                    </div>
                ))}
            </div>
            <input type="hidden" id="doctorId" name="doctorId" value={selectedDoctor} />
        </div>
    );
}
