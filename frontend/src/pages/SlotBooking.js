import React, { useState } from 'react';
import axios from 'axios';

const SlotBooking = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', date: '', timeSlot: '', services: [] });
    const[message, setMessage] = useState({ type: '', text: '' });
    
    const timeSlots =["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM"];
    const availableServices =["X-Ray", "Cremation", "Hydrotherapy"];
    const today = new Date().toISOString().split('T')[0];

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        let updatedServices = [...formData.services];
        if (checked) updatedServices.push(value);
        else updatedServices = updatedServices.filter(s => s !== value);
        setFormData({ ...formData, services: updatedServices });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        if (formData.services.length === 0) return setMessage({ type: 'error', text: 'Please select at least one service.' });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/slots/book`, formData);
            setMessage({ type: 'success', text: res.data.message });
            setFormData({ name: '', mobile: '', date: '', timeSlot: '', services:[] });
        } catch (error) { setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred.' }); }
    };

    return (
        <div className="min-h-screen bg-emerald-50 py-20 px-4 flex justify-center items-center font-sans text-gray-800">
            <div className="bg-white w-full max-w-3xl shadow-2xl rounded-3xl p-8 md:p-12 border border-emerald-100">
                <div className="text-center mb-10">
                    <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Appointments</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-900">Book a Visit Slot</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                            <input type="date" name="date" min={today} value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                            <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" required>
                                <option value="" disabled>Select a time slot</option>
                                {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-4">Select Services</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {availableServices.map(srv => (
                                <label key={srv} className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 transition">
                                    <input type="checkbox" value={srv} checked={formData.services.includes(srv)} onChange={handleServiceChange} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                                    <span className="font-medium text-gray-700">{srv}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-xl transition shadow-lg text-lg">Confirm Booking</button>
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
export default SlotBooking;