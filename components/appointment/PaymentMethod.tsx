export default function PaymentMethod() {
    return (
        <div className="mb-8" id="step-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">4. Select Payment Method</h3>
            <div>
                <select
                    id="pay"
                    name="pay"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select payment method
                    </option>
                    <option value="CASH">Cash</option>
                    <option value="STRIPE">Credit/Debit Card (Stripe)</option>
                    <option value="ESEWA">eSewa</option>
                </select>
            </div>
        </div>
    );
}