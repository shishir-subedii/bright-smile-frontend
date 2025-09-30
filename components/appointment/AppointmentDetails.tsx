export default function AppointmentDetails() {
    return (
        <div className="mb-12" id="step-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">2. Select Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        min="08:00"
                        max="18:00"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>
            </div>
        </div>
    );
}