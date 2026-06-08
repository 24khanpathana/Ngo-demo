import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAmbulance, FaArrowRight, FaFireAlt, FaStethoscope, FaSyringe, FaWater } from 'react-icons/fa';
import api from '../utils/api';

const ServiceForm = ({ title, endpoint, fields }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(endpoint, data);
            setMsg(res.data.message || 'Form submitted successfully.');
            setData({});
        } catch (err) {
            setMsg('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
            <h3 className="mb-8 text-3xl font-black text-slate-950">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map(f => (
                    <div key={f.name}>
                        <label className="mb-2 block text-sm font-semibold capitalize text-slate-700">{f.label || f.name}</label>
                        {f.type === 'textarea' ? (
                            <textarea className="input-field resize-none" rows="4" required onChange={e => setData({ ...data, [f.name]: e.target.value })} value={data[f.name] || ''} />
                        ) : (
                            <input type={f.type || 'text'} className="input-field" required onChange={e => setData({ ...data, [f.name]: e.target.value })} value={data[f.name] || ''} />
                        )}
                    </div>
                ))}
                <button type="submit" className="btn-primary w-full py-4">Submit</button>
            </form>
            {msg && <p className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center font-bold text-emerald-700">{msg}</p>}
        </div>
    );
};

const DynamicCustomForm = ({ formMeta }) => {
    const [data, setData] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/forms/submit', {
                formId: formMeta._id,
                formTitle: formMeta.customForm.title,
                data,
            });
            setMsg('Form submitted successfully.');
            setData({});
        } catch (err) {
            setMsg('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
            <h3 className="mb-4 text-3xl font-black text-slate-950">{formMeta.customForm.title}</h3>
            {formMeta.description && <p className="mb-8 leading-7 text-slate-600">{formMeta.description}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                {formMeta.customForm.fields.map((f, i) => (
                    <div key={i}>
                        <label className="mb-2 block text-sm font-semibold capitalize text-slate-700">{f.name}</label>
                        <input type={f.type} className="input-field" required onChange={e => setData({ ...data, [f.name]: e.target.value })} value={data[f.name] || ''} />
                    </div>
                ))}
                <button type="submit" className="btn-primary w-full py-4">Submit</button>
            </form>
            {msg && <p className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center font-bold text-emerald-700">{msg}</p>}
        </div>
    );
};

const Service = () => {
    const navigate = useNavigate();
    const [dynamicForms, setDynamicForms] = useState([]);

    useEffect(() => {
        document.title = 'Programs | Pyaar Foundation';
        api.get('/api/content')
            .then(res => setDynamicForms(res.data.filter(c => c.page === 'Service')))
            .catch(() => setDynamicForms([]));
    }, []);

    const services = [
        {
            icon: FaAmbulance,
            title: 'Rescue & Emergency Care',
            desc: 'When a street animal is injured, abused, abandoned, or critically sick, our rescue network coordinates transport and immediate intervention.',
        },
        {
            icon: FaStethoscope,
            title: 'Operation Theatre & Rehab',
            desc: 'Fractures, maggot wounds, infections, and trauma cases receive veterinary care, surgery support, hospitalisation, and recovery planning.',
        },
        {
            icon: FaWater,
            title: 'Hydrotherapy and Mobility',
            desc: 'For animals recovering from paralysis or orthopaedic injuries, assisted movement helps rebuild strength with less pain and fear.',
        },
        {
            icon: FaSyringe,
            title: 'ABC and Vaccination',
            desc: 'Community animals are humanely sterilised, vaccinated against rabies, and released with dignity to reduce future suffering.',
        },
        {
            icon: FaFireAlt,
            title: 'Organic Shelter Products',
            desc: 'Eco-friendly products made through shelter-supported initiatives help fund rescue, medical treatment, and daily animal care.',
        },
        {
            icon: FaFireAlt,
            title: 'Dignified Farewell Support',
            desc: 'Every life deserves dignity at the end. We support respectful farewell services for families and rescued animals.',
        },
    ];

    return (
        <div className="min-h-screen w-full bg-mist pb-24">
            <div className="relative overflow-hidden bg-[#071513] px-6 py-28 text-center text-white">
                <div className="absolute inset-0 opacity-25">
                    <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1600&q=80" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#071513]/80 to-[#071513]" />
                <div className="relative mx-auto max-w-3xl">
                    <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-teal-200">Programs and initiatives</span>
                    <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">A complete care path for animals in crisis.</h1>
                    <p className="text-lg leading-8 text-slate-300 md:text-xl">
                        From rescue and treatment to sterilisation, adoption, awareness, and dignified end-of-life support, our programs are designed around real street-level needs.
                    </p>
                </div>
            </div>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
                <div className="grid gap-5 md:grid-cols-4">
                    {['Rescue', 'Rehab', 'Adoption', 'Awareness'].map(item => (
                        <div key={item} className="rounded-[1.5rem] border border-white bg-white p-6 text-center shadow-xl shadow-slate-200/50">
                            <p className="text-2xl font-black text-primary">{item}</p>
                            <p className="mt-2 text-sm text-slate-500">A focused action stream</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
                <div className="mb-12 max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">What we do</p>
                    <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Facilities and fieldwork that keep hope practical.</h2>
                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        These initiatives follow a transparent flow donors can understand: rescue, treat, rehabilitate, adopt, prevent future suffering, and educate communities.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {services.map((srv, idx) => (
                        <div key={idx} className="group rounded-[2rem] border border-white bg-white p-8 shadow-xl shadow-slate-200/50 transition-transform duration-300 hover:-translate-y-1">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-primary transition-transform duration-300 group-hover:scale-110">
                                <srv.icon size={28} />
                            </div>
                            <h3 className="mb-4 text-2xl font-black text-slate-950">{srv.title}</h3>
                            <p className="text-lg leading-8 text-slate-600">{srv.desc}</p>
                        </div>
                    ))}
                    <div className="flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-primary to-[#071513] p-8 text-white shadow-xl shadow-teal-900/20">
                        <h3 className="mb-4 text-3xl font-black">Fund the next urgent case</h3>
                        <p className="mb-8 text-lg leading-8 text-teal-50">
                            Medicines, surgeries, transport, nutrition, and daily cleaning supplies require continuous support.
                        </p>
                        <button onClick={() => navigate('/donate')} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-primary shadow-lg transition hover:bg-teal-50">
                            Open QR Donation <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-12">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.28em] text-primary">Take action</span>
                    <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Volunteer, report, or help us improve.</h2>
                    <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
                        Join as a volunteer, share feedback, report concerns, or use any custom outreach forms published by the Pyaar Foundation admin team.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
                    <ServiceForm
                        title="Volunteer Application"
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

                    {dynamicForms.map(form => form.customForm?.fields?.length > 0 && (
                        <DynamicCustomForm key={form._id} formMeta={form} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Service;
