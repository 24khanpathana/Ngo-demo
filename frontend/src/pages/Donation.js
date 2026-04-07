import React, { useState } from 'react';
import axios from 'axios';

const Donation = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', amount: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            const { data: { key } } = { key: process.env.REACT_APP_RAZORPAY_KEY_ID };
            const { data: { id, amount } } = await axios.post(`${process.env.REACT_APP_API_URL}/api/donations/order`, { amount: formData.amount });

            const options = {
                key, amount, currency: "INR", name: "Rise for Tails", description: "Donation for Animal Welfare", order_id: id,
                handler: async function (response) {
                    try {
                        const verifyUrl = `${process.env.REACT_APP_API_URL}/api/donations/verify`;
                        const verificationData = { ...response, name: formData.name, mobile: formData.mobile, amount: formData.amount };
                        const { data } = await axios.post(verifyUrl, verificationData);
                        setMessage({ type: 'success', text: data.message });
                        setFormData({ name: '', mobile: '', amount: '' });
                    } catch (error) { setMessage({ type: 'error', text: "Payment verification failed." }); }
                },
                prefill: { name: formData.name, contact: formData.mobile },
                theme: { color: "#ea580c" }, // Tailwind orange-600 hex
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) { setMessage({ type: 'error', text: "An error occurred. Please try again." }); }
    };

    return (
        <div className="min-h-screen bg-orange-50/50 py-20 px-4 flex justify-center items-center font-sans text-gray-800">
            <div className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl p-8 md:p-12 border border-orange-100">
                <div className="text-center mb-10">
                    <p className="text-emerald-700 font-bold tracking-widest uppercase text-sm mb-2">Support Us</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-900">Make a Donation</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none bg-gray-50" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none bg-gray-50" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (INR)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-600 outline-none bg-gray-50 text-lg font-semibold text-emerald-900" required min="10" />
                        </div>
                    </div>
                    <div className="pt-6">
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg text-lg">Donate Now</button>
                    </div>
                </form>

                {message.text && (
                    <div className={`mt-8 p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Donation;