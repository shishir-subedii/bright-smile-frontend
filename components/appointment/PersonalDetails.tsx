export default function PersonalDetails({ formData, updateField, countryCode, setCountryCode }: any) {
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").substring(0, 10);
        updateField("phoneNumber", value);
    };

    return (
        <div className="mb-12" id="step-3">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">3. Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        required
                        placeholder="e.g., 30"
                        value={formData.age}
                        onChange={(e) => {
                            const value = e.target.value;
                            updateField("age", value === "" ? "" : Number(value));
                        }}
                        min="1"
                        max="120"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 
               focus:outline-none focus:border-[#00BCD4] 
               focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={formData.gender === "MALE"}
                                onChange={(e) => updateField("gender", e.target.value)}
                                className="h-4 w-4 text-[#00BCD4] focus:ring-[#00BCD4]"
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={formData.gender === "FEMALE"}
                                onChange={(e) => updateField("gender", e.target.value)}
                                className="h-4 w-4 text-[#00BCD4] focus:ring-[#00BCD4]"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex gap-2">
                    <select
                        id="countryCode"
                        name="countryCode"
                        value={countryCode}
                        required
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-1/4 px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    >
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+977">+977 (NP)</option>
                        <option value="+91">+91 (IN)</option>
                    </select>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="98xxxxxxx"
                        required
                        value={formData.phoneNumber}
                        onChange={handlePhoneInput}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    />
                </div>
            </div>
        </div>
    );
}
