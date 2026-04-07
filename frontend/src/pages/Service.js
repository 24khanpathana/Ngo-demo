import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaAmbulance, FaStethoscope, FaSyringe, FaWater, FaFireAlt } from 'react-icons/fa';

// --- Form Component for Static Forms ---
const ServiceForm = ({ title, endpoint, fields }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, data);
            setMsg(res.data.message || 'Form submitted successfully!'); 
            setData({});
        } catch (err) { 
            setMsg('Error submitting form. Please try again.'); 
        }
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map(f => (
                    <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{f.label || f.name}</label>
                        {f.type === 'textarea' ? (
                            <textarea 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-gray-50 text-gray-800 transition-all" 
                                rows="4" required 
                                onChange={e => setData({...data,[f.name]: e.target.value})} 
                                value={data[f.name] || ''} 
                            />
                        ) : (
                            <input 
                                type={f.type || 'text'} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-gray-50 text-gray-800 transition-all" 
                                required 
                                onChange={e => setData({...data, [f.name]: e.target.value})} 
                                value={data[f.name] || ''} 
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]">
                    Submit
                </button>
            </form>
            {msg && <p className="mt-6 text-center font-bold text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">{msg}</p>}
        </div>
    );
};

// --- Form Component for Admin-Created Dynamic Forms ---
const DynamicCustomForm = ({ formMeta }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/forms/submit`, {
                formId: formMeta._id, formTitle: formMeta.customForm.title, data
            });
            setMsg('Form submitted successfully!');
            setData({});
        } catch (err) {
            setMsg('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-4 border-t-primary border-x border-b border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{formMeta.customForm.title}</h3>
            {formMeta.description && <p className="mb-8 text-gray-500 leading-relaxed">{formMeta.description}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                {formMeta.customForm.fields.map((f, i) => (
                    <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{f.name}</label>
                        <input 
                            type={f.type} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-gray-50 text-gray-800 transition-all" 
                            required 
                            onChange={e => setData({...data,[f.name]: e.target.value})} 
                            value={data[f.name] || ''} 
                        />
                    </div>
                ))}
                <button type="submit" className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]">
                    Submit
                </button>
            </form>
            {msg && <p className="mt-6 text-center font-bold text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">{msg}</p>}
        </div>
    );
};

// --- Main Service Page Component ---
const Service = () => {
    const navigate = useNavigate();
    const [dynamicForms, setDynamicForms] = useState([]);

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`)
            .then(res => setDynamicForms(res.data.filter(c => c.page === 'Service')))
            .catch(err => console.error("Error fetching dynamic forms:", err));
    },[]);

    const services =[
        {
            icon: FaAmbulance, title: "Rescue & Emergency Care",
            desc: "When a street animal is struck by a car and left bleeding on the side of the road, our rescue team is their only hope. We transport injured and abandoned animals immediately to our centre for life-saving interventions."
        },
        {
            icon: FaStethoscope, title: "Operation Theatre & Rehab",
            desc: "Broken bones, maggot wounds, and severe infections require dedicated care. Our state-of-the-art operation theatre and hospitalisation wards allow us to perform complex surgeries, including custom prosthetics for large animals."
        },
        {
            icon: FaWater, title: "Hydrotherapy Unit",
            desc: "For animals recovering from paralysis or orthopaedic surgeries, movement is excruciating. Our specialized hydrotherapy unit allows them to rebuild muscle strength and mobility in a weightless, pain-free environment."
        },
        {
            icon: FaSyringe, title: "Animal Birth Control (ABC)",
            desc: "To stop the cycle of suffering on the streets, we run a rigorous ABC programme. Community dogs are humanely sterilised, vaccinated against rabies, and released—reducing human-animal conflict."
        },
        {
            icon: FaFireAlt, title: "Pet Cremation Services",
            desc: "Every life deserves dignity in the end. We established Nagpur’s first dedicated pet crematorium to provide a hygienic, legal, and deeply respectful farewell for pets, solving a heartbreaking challenge for local pet parents."
        }
    ];

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen pb-24">
            
            {/* 1. EMOTIONAL HEADER */}
            <div className="bg-darkBg text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Healing the Broken.</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Our facilities aren't just buildings—they are the line between life and death for thousands of voiceless animals. See how your donations are put to work, and get involved below.
                </p>
            </div>

            {/* 2. SERVICES & STORY SECTION */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((srv, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <srv.icon size={30} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{srv.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{srv.desc}</p>
                        </div>
                    ))}
                    
                    {/* Emotional CTA Card */}
                    <div className="bg-gradient-to-br from-primary to-emerald-700 p-10 rounded-3xl shadow-xl text-white flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-3xl font-bold mb-4">We Can't Do It Alone</h3>
                        <p className="text-emerald-100 mb-8 text-lg">
                            Medicines, surgical equipment, and daily food require constant funding. Help us keep the operation theatre lights on.
                        </p>
                        <button onClick={() => navigate('/donate')} className="bg-white text-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-50 transition-colors w-full active:scale-[0.98]">
                            Fund Our Medical Ward
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. OUTREACH & ACTION FORMS SECTION */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 inline-block">Take Action</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Outreach & Forms</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join our cause as a volunteer, share your feedback to help us grow, or register for our custom outreach programs.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <ServiceForm 
                        title="Volunteer Apply" 
                        endpoint="/api/volunteers/apply" 
                        fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'mobile', type: 'tel' }, { name: 'skills', type: 'textarea', label: 'Skills / Reason' }]} 
                    />
                    <ServiceForm 
                        title="General Feedback" 
                        endpoint="/api/feedback" 
                        fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'feedback', type: 'textarea' }]} 
                    />
                    <ServiceForm 
                        title="Register Complaint" 
                        endpoint="/api/complaints" 
                        fields={[{ name: 'name' }, { name: 'email', type: 'email' }, { name: 'complaint', type: 'textarea' }]} 
                    />
                    
                    {/* Render Admin-Created Dynamic Forms */}
                    {dynamicForms.map(form => form.customForm?.fields?.length > 0 && (
                        <DynamicCustomForm key={form._id} formMeta={form} />
                    ))}
                </div>
            </section>
            
        </div>
    );
};

export default Service;