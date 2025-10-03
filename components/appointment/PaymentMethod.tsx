import { paymentMethod } from "@/types";

export default function PaymentMethod({ formData, updateField }: any) {
    return (
        <div className="mb-8" id="step-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">4. Select Payment Method</h3>
            <div>
                <select
                    id="pay"
                    name="pay"
                    value={formData.pay}
                    onChange={(e) => updateField("pay", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00BCD4] focus:shadow-[0_0_0_3px_rgba(0,188,212,0.2)]"
                >
                    <option value="" disabled>Select payment method</option>
                    <option value={paymentMethod.CASH}>Cash</option>
                    <option value={paymentMethod.STRIPE}>Credit/Debit Card (Stripe)</option>
                    <option value={paymentMethod.ESEWA}>eSewa</option>
                </select>
            </div>
        </div>
    );
}
