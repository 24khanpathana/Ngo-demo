import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#FAFAFA]">
            {/* HEADER */}
            <div className="bg-white border-b border-gray-100 py-24 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Born from a Crisis. <br/><span className="text-primary">Fueled by Empathy.</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        What began as a small neighborhood effort to feed starving animals during the COVID-19 lockdown exposed a heartbreaking reality we simply could not ignore.
                    </p>
                </div>
            </div>

            {/* THE STORY */}
            <section className="page-container py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            The pandemic didn't create the void; it made it impossible to ignore.
                        </h2>
                        <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                            <p>
                                During the global lockdown, our feeding drive scaled rapidly to 3,000 daily meals. As we fed the strays, we witnessed animals suffering with horrific injuries, sickness, and abuse—with absolutely no human support.
                            </p>
                            <p>
                                Central India lacked any formal rescue or rehabilitation infrastructure. We realized that feeding them wasn't enough; they were dying from treatable conditions. It was at that moment we decided to build what did not exist.
                            </p>
                            <p className="font-semibold text-gray-900 border-l-4 border-primary pl-4">
                                Today, Rise for Tails operates a full-scale rescue and treatment centre in Nagpur, equipped with full-time veterinary doctors, surgical infrastructure, and recovery facilities.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80" alt="Care" className="rounded-3xl w-full h-64 object-cover shadow-lg" />
                        <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80" alt="Rescue" className="rounded-3xl w-full h-64 object-cover shadow-lg mt-8" />
                    </div>
                </div>
            </section>

            {/* FOUNDER SPOTLIGHT */}
            <section className="bg-darkBg text-white py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <FaQuoteLeft className="text-5xl text-primary/50 mx-auto mb-8" />
                    <h3 className="text-3xl md:text-5xl font-bold mb-10 leading-snug">
                        "Compassion without action is just sentiment."
                    </h3>
                    <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                        This simple quote encapsulates everything we stand for. This mission only exists because of our donors, the tireless morning feeders, and a team that chooses this emotionally demanding work every single day.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden border-2 border-primary">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Gargi Vairagare" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-lg">Gargi Vairagare</p>
                            <p className="text-gray-400 text-sm">Founder, RISE (Founded at age 17)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Be a Part of Our Story</h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
                    Together, we haven't just built a rescue center; we've proven that a more compassionate city is a tangible reality.
                </p>
                <button onClick={() => navigate('/donate')} className="btn-primary text-lg px-10 py-4 shadow-lg rounded-full">
                    Support Our Mission Today
                </button>
            </section>
        </div>
    );
};
export default About;