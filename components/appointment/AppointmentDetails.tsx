"use client";

import { appointmentFormData } from "@/types";
import { useMemo } from "react";
import { toast } from "sonner";

// Function to generate time slots
function generateTimeSlots(start = "10:00", end = "18:00", interval = 15) {
    const slots: string[] = [];
    let [h, m] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    while (h < endH || (h === endH && m <= endM)) {
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        m += interval;
        if (m >= 60) {
            h += 1;
            m -= 60;
        }
    }

    return slots;
}

// Static holidays and lunch breaks
const holidays = [
    {
        id: "3eee0160-a15e-4626-8363-51f4317a624e",
        date: "2025-10-20",
        reason: "Dashain Festival",
    },
];

const lunchBreakStart = "14:00"; // 2:00 PM
const lunchBreakEnd = "14:30"; // 2:30 PM

interface AppointmentDetailsProps {
    formData: appointmentFormData;
    updateField: (field: keyof appointmentFormData, value: any) => void;
}

export default function AppointmentDetails({
    formData,
    updateField,
}: AppointmentDetailsProps) {
    const slots = useMemo(() => generateTimeSlots("10:00", "18:00", 15), []);

    // Disable past dates, Saturdays, and holidays
    const isDateDisabled = (dateStr: string) => {
        const today = new Date();
        const date = new Date(dateStr);

        // Disable past dates
        if (date < new Date(today.toDateString())) return true;

        // Disable Saturdays
        if (date.getDay() === 6) return true;

        // Disable holidays
        const formatted = date.toISOString().split("T")[0];
        return holidays.some((h) => h.date === formatted);
    };

    // Disable lunch break slots
    const isSlotDisabled = (slot: string) => {
        const [h, m] = slot.split(":").map(Number);
        const totalMins = h * 60 + m;
        const [lh, lm] = lunchBreakStart.split(":").map(Number);
        const [eh, em] = lunchBreakEnd.split(":").map(Number);
        const startMins = lh * 60 + lm;
        const endMins = eh * 60 + em;

        return totalMins >= startMins && totalMins < endMins;
    };

    // Minimum date = today
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="mb-12" id="step-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                2. Select Date & Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(e) => {
                            const selected = e.target.value;
                            if (isDateDisabled(selected)) {
                                toast.info("This date is not available for appointments.");
                                updateField("date", "");
                            } else {
                                updateField("date", selected);
                            }
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:border-[#00BCD4] 
                       focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>

                {/* Time Picker */}
                <div>
                    <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Appointment Time
                    </label>
                    <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={(e) => updateField("time", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:border-[#00BCD4] 
                       focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    >
                        <option value="" disabled>
                            Select time
                        </option>
                        {slots.map((t) => (
                            <option key={t} value={t} disabled={isSlotDisabled(t)}>
                                {t} {isSlotDisabled(t) ? "(Lunch Break)" : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
