function generateTimeSlots(start = "10:00", end = "18:00", interval = 15) {
    const slots: string[] = [];
    let [h, m] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    while (h < endH || (h === endH && m <= endM)) {
        slots.push(
            `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
        );
        m += interval;
        if (m >= 60) {
            h += 1;
            m -= 60;
        }
    }
    return slots;
}

export default function AppointmentDetails({ formData, updateField }: any) {
    const slots = generateTimeSlots("10:00", "18:00", 15);

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
                        value={formData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                   focus:outline-none focus:border-[#00BCD4] 
                                   focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>

                {/* Time Picker (Dropdown with 15-min intervals) */}
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
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
