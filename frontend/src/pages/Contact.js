import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            await axios.post(`${apiUrl}/api/feedback`, {
                name: formData.name,
                email: formData.email,
                feedback: formData.message,
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Unable to send your message. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                
                {/* Left Side: Contact Info & Map */}
                <div className="space-y-10">
                    <div>
                        <h1 className="section-title mb-4">Get in touch</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-md">
                            We'd love to hear from you. Whether you have a question about our rescues, volunteering, or anything else, our team is ready to answer all your questions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Our Location</h4>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">Rise for Tails Rescue Centre<br/>Nagpur, Maharashtra, India</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Email Us</h4>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">contact@risefortails.org</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Call Us</h4>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Card */}
                    <div className="bg-white dark:bg-darkCard p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <iframe
                            src="https://www.google.com/maps?q=Nagpur,Maharashtra,India&output=embed"
                            width="100%"
                            height="300"
                            className="rounded-xl border-0 grayscale hover:grayscale-0 transition-all duration-500"
                            allowFullScreen
                            loading="lazy"
                            title="Location Map"
                        ></iframe>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="card lg:sticky lg:top-28">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input 
                                type="text" required 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                                className="input-field" placeholder="John Doe" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email address</label>
                            <input 
                                type="email" required 
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                                className="input-field" placeholder="john@example.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <textarea 
                                required rows="5" 
                                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} 
                                className="input-field resize-none" placeholder="How can we help you?" 
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <p className="text-primary font-medium text-center bg-primary/10 p-3 rounded-lg mt-4">Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-500 font-medium text-center bg-red-50 p-3 rounded-lg mt-4">
                                {errorMessage || 'Error sending message. Please try again.'}
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </div>
    );
};
export default Contact;