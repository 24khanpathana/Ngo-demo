import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FaHeartbeat, FaHandHoldingHeart, FaUsers, FaPaw, 
    FaPhoneAlt, FaSyringe, FaHome, FaCheckCircle, 
    FaArrowRight, FaAmbulance, FaStethoscope 
} from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const[contactData, setContactData] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    const [contactMsg, setContactMsg] = useState('');

    // Fetch animals for the "Meet Our Pets" section
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`)
            .then(res => setPets(res.data.slice(0, 4))) // Get max 4 pets for home page
            .catch(err => console.log(err));
    },[]);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback`, {
                name: contactData.name,
                email: contactData.email,
                feedback: `Subject: ${contactData.subject} | Phone: ${contactData.phone} | Message: ${contactData.message}`
            });
            setContactMsg('Thank You! We have received your message and will get back to you soon.');
            setContactData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            setContactMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full font-sans text-gray-800 bg-[#FAFAFA]">
            
            {/* 1. HERO SECTION: Emotional, Urgent, with Video BG */}
            <div className="relative pt-20 pb-32 flex flex-col items-center justify-center px-6 border-b border-gray-100 bg-white overflow-hidden min-h-[90vh]">
                <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80">
                    <source src="/BG.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-darkBg/90 via-darkBg/60 to-darkBg/90 z-10"></div>
                
                <div className="relative z-20 max-w-5xl mx-auto mt-10 text-white text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-12">
                    <div className="flex-1">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold mb-6 tracking-wide uppercase shadow-lg backdrop-blur-md">
                            Compassion. Care. Coexistence.
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-lg">
                            The Care They Need, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">The Love They Deserve.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md">
                            Once abandoned and fighting for survival, they now have a safe haven. But they can't survive on hope alone.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-5 mb-10">
                            <button onClick={() => navigate('/book-a-slot')} className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/20 transition-transform transform hover:-translate-y-1">
                                Book a Visit Slot
                            </button>
                            <button onClick={() => navigate('/service')} className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center">
    <FaUsers className="mr-2"/> Volunteer With Us
</button>
                        </div>

                        {/* Emergency Banner */}
                        <div 
                            onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl cursor-pointer hover:bg-white/20 transition group"
                        >
                            <div className="bg-red-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                                <FaPhoneAlt className="text-white"/>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-red-300 uppercase font-bold tracking-wider">Animal Emergency?</p>
                                <p className="font-medium text-white">Report Now - We're Here to Help</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. IMPACT STATS */}
            <section className="relative -mt-16 z-30 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="pt-4 md:pt-0"><h3 className="text-4xl font-black text-gray-900 mb-1">12,000+</h3><p className="text-gray-500 font-medium">Animals Rescued</p></div>
                    <div className="pt-4 md:pt-0"><h3 className="text-4xl font-black text-gray-900 mb-1">95%</h3><p className="text-gray-500 font-medium">Recovery Rate</p></div>
                    <div className="pt-4 md:pt-0"><h3 className="text-4xl font-black text-gray-900 mb-1">100%</h3><p className="text-gray-500 font-medium">Commitment</p></div>
                    <div className="pt-4 md:pt-0"><h3 className="text-4xl font-black text-gray-900 mb-1">300+</h3><p className="text-gray-500 font-medium">Active Volunteers</p></div>
                </div>
            </section>

            {/* 3. WHAT WE DO (Services Preview) */}
            <section className="page-container py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">More Than Just a Shelter.</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        From rescue to rehabilitation, we provide comprehensive, life-saving care for animals who have nowhere else to turn.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{icon: FaAmbulance, t: 'Emergency Rescue', d: 'Our rescue team responds to calls involving injured, sick, and abandoned animals.'},
                      {icon: FaStethoscope, t: 'Medical Support', d: 'Advanced veterinary care, including complex surgeries and amputations.'},
                      {icon: FaHome, t: 'Adoption & Care', d: 'Providing a safe haven and connecting fully recovered animals with loving forever homes.'}].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-2 rounded-3xl p-10 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="text-2xl text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.t}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.d}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button onClick={() => navigate('/service')} className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center justify-center mx-auto group">
                        Explore All Services <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </section>

            {/* 4. MEET OUR PETS (Dynamic from DB) */}
            <section className="bg-emerald-200 -z-10 text-emerald-900 font-bold py-3 px-8 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-gray-600 leading-relaxed mb-6 font-bold tracking-widest uppercase text-sm mb-2 inline-block">Find Your Companion</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Meet Our Rescues</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">Every pet here is ready to be loved. Give them a chance at a happy life.</p>
                        </div>
                        <button onClick={() => navigate('/adoption')} className="bg-white text-emerald-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                            View All Pets
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pets.map(pet => (
                            <div key={pet._id} className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col group text-gray-900">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                                        {pet.breed}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black mb-1">{pet.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 font-medium">{pet.age}</p>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">{pet.description.substring(0,80)}...</p>
                                    <button onClick={() => navigate('/adoption')} className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold py-3 rounded-xl transition-colors">
                                        Adopt Me
                                    </button>
                                </div>
                            </div>
                        ))}
                        {pets.length === 0 && <p className="text-emerald-200">Loading available pets...</p>}
                    </div>
                </div>
            </section>

            {/* 5. RESCUE STORIES (Emotional Storytelling) */}
            <section className="py-24 px-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Stories of Resilience</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Witness the incredible transformations made possible by your support.</p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Story: Milky */}
                        <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-full sm:w-2/5 h-64 sm:h-full rounded-2xl overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80" alt="Milky" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="w-full sm:w-3/5 py-4">
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Survived: Accident & Tick Fever</span>
                                <h3 className="text-3xl font-black text-gray-900 mb-3">Milky</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Rescued as a puppy with crushed forelimbs, Milky refused to give up. After a complex amputation, she rebounded faster than anyone expected. Today, she is the beloved heartbeat of our centre.
                                </p>
                            </div>
                        </div>
                        {/* Story: Sanju */}
                        <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-8 border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-full sm:w-2/5 h-64 sm:h-full rounded-2xl overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80" alt="Sanju" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="w-full sm:w-3/5 py-4">
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Survived: Severe Leg Wound</span>
                                <h3 className="text-3xl font-black text-gray-900 mb-3">Sanju</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    An abandoned bull rescued with a rotting leg wound. We fought tirelessly to save his leg, but eventually fitted him with a custom prosthetic limb. His resilience is a testament to the fact that every animal deserves a chance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                        {/* 10. YOU CAN HELP (Split Background Section) */}
            <section className="bg-emerald-900 text-white">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1000&q=80" alt="Help Animals" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-emerald-900/80 p-12 md:p-20 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">You Can Help</h2>
                            <p className="text-emerald-100 text-lg leading-relaxed max-w-md">
                                Not ready to adopt? You can still make a difference. Your support helps us provide food, shelter, and medical care for animals in need.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-white text-gray-900 p-12 md:p-20 flex flex-col justify-center">
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Your contribution directly supports medical care, food, shelter, and rehabilitation for animals who have nowhere else to go. Every rupee makes a difference in an animal's life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button onClick={() => navigate('/donate')} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition text-center">
                                ♡ Donate Now
                            </button>
                            <button onClick={() => navigate('/volunteer')} className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold py-4 px-8 rounded-xl transition text-center">
                                <FaUsers className="inline mr-2"/> Become a Volunteer
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center divide-x divide-gray-200">
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">3,000</h4><p className="text-xs text-gray-500 uppercase">Daily meals served</p></div>
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">70%</h4><p className="text-xs text-gray-500 uppercase">Regional rescues</p></div>
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">24/7</h4><p className="text-xs text-gray-500 uppercase">Emergency care</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. HOW ADOPTION WORKS */}
            <section className="bg-emerald-50/50 py-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-16 tracking-tight">How Adoption Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-10 left-[10%] w-[80%] h-0.5 bg-emerald-200 -z-10"></div>
                        {[{num: 1, t: 'Choose a Pet', d: 'Browse profiles of cats and dogs looking for a home.'},
                          {num: 2, t: 'Meet Your Match', d: 'Schedule a visit or online meeting with the animal.'},
                          {num: 3, t: 'Adoption Application', d: 'Fill out a short form so we can verify the best match.'},
                          {num: 4, t: 'Take Them Home', d: 'Welcome your new family member and start your journey!'}].map((step) => (
                            <div key={step.num} className="flex flex-col items-center px-4">
                                <div className="w-20 h-20 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black mb-6 shadow-xl shadow-emerald-600/30 transform rotate-3">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.t}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. GET IN TOUCH (Contact Form & Info) */}
            <section id="contact-section" className="py-24 px-6 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Get in Touch</h2>
                        <p className="text-gray-600 mt-4 text-lg">Have questions about adoption, volunteering, or donations? We're happy to help.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100">
                            {contactMsg ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <FaCheckCircle className="text-6xl text-emerald-500 mb-6" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">{contactMsg}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input type="text" required value={contactData.name} onChange={e=>setContactData({...contactData, name: e.target.value})} className="input-field" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input type="email" required value={contactData.email} onChange={e=>setContactData({...contactData, email: e.target.value})} className="input-field" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" required value={contactData.phone} onChange={e=>setContactData({...contactData, phone: e.target.value})} className="input-field" placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                            <select value={contactData.subject} onChange={e=>setContactData({...contactData, subject: e.target.value})} className="input-field text-gray-700 cursor-pointer">
                                                <option>General Inquiry</option>
                                                <option>Adoption</option>
                                                <option>Donation</option>
                                                <option>Volunteer</option>
                                                <option>Report Emergency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                        <textarea required rows="4" value={contactData.message} onChange={e=>setContactData({...contactData, message: e.target.value})} className="input-field resize-none" placeholder="Tell us how we can help you..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition shadow-lg mt-2">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info & Location Map (Modern Stack) */}
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center text-emerald-700 mb-4"><FaHome size={20}/></div>
                                    <p className="font-bold text-gray-900 mb-1">Our Location</p>
                                    <p className="text-gray-500 text-sm">Rise for Tails Rescue Centre<br/>Nagpur, Maharashtra, India</p>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center text-emerald-700 mb-4"><FaPhoneAlt size={18}/></div>
                                    <p className="font-bold text-gray-900 mb-1">Contact Us</p>
                                    <p className="text-gray-500 text-sm">Emergency: +91 98765 XXXXX<br/>Email: contact@risefortails.org</p>
                                </div>
                            </div>
                            
                            {/* Embedded Google Map */}
                            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                                <iframe
                                    src="https://www.google.com/maps?q=Nagpur,Maharashtra,India&output=embed"
                                    width="100%"
                                    height="250"
                                    className="rounded-2xl border-0 grayscale hover:grayscale-0 transition-all duration-500"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Location Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;