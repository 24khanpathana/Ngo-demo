import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adoption = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    // Fetch dynamic animals from the database
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`)
            .then(res => setAnimals(res.data))
            .catch(err => console.error("Error fetching animals:", err));
    },[]);

    // Hardcoded emotional stories extracted from the PDF
    const storyAnimals =[
        {
            name: "Sanju", breed: "Bull", age: "7 Years",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
            status: "Requires Sponsorship",
            story: "Abandoned with a rotting leg wound, Sanju fought for his life. Despite intensive treatment, his leg had to be amputated. We fitted him with a custom prosthetic limb. Today, he walks tall—a true testament to resilience."
        },
        {
            name: "Jhumki", breed: "Indie Dog", age: "8 Years",
            image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80",
            status: "Sponsor Her Care",
            story: "Struck by a vehicle, paralyzed, and suffering from severe wounds while pregnant. Her puppies died inside her womb. After a midnight emergency surgery and round-the-clock care, she miraculously recovered."
        },
        {
            name: "Rio", breed: "Beagle", age: "8 Years",
            image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
            status: "Happily Adopted!",
            story: "Brought to us late at night, abandoned and suffering from a massive stomach growth and oral tumors. A donor refused to give up on him. Today, his tumors are healed, and he is thriving in a loving home."
        }
    ];

    return (
        <div className="w-full font-sans text-gray-800 bg-[#FAFAFA] min-h-screen pb-20">
            
            {/* 1. EMOTIONAL HEADER */}
            <div div className="bg-white border-b border-gray-100 py-24 text-center px-6">
                <span span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 inline-block">Their Second Chance</span>
                <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tight">Adopt a Best Friend.</h1>
                <p span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 inline-block">
                    They have survived the unimaginable—abandonment, accidents, and cruelty. Now, they are just looking for a soft place to land. Browse our available animals below and find your perfect companion.
                </p>
            </div>
            
            {/* 2. DYNAMIC ADOPTION LISTINGS (From Database) */}
            <section className="max-w-7xl mx-auto px-6 mt-20 text-left">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Ready for Adoption</h2>
                    <p className="text-gray-500 text-lg">Open your heart and home to a rescued friend.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {animals.map(animal => (
                        <div key={animal._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                            <div className="overflow-hidden h-72">
                                <img src={animal.imageUrl} alt={animal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-3xl font-bold text-gray-900">{animal.name}</h2>
                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">{animal.breed}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6 font-medium">📅 Age: {animal.age}</p>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{animal.description}</p>
                                <button 
                                    onClick={() => { 
                                        alert(`Thank you for your interest in ${animal.name}! Redirecting you to our contact page to begin the adoption process.`); 
                                        navigate('/contact'); 
                                    }} 
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
                                >
                                    Adopt Me
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {animals.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm max-w-2xl mx-auto">
                        <p className="text-gray-500 text-lg font-medium">No animals are currently listed for adoption online. Please contact us directly or check back soon!</p>
                    </div>
                )}
            </section>

            {/* 3. FEATURED SURVIVOR STORIES (From PDF) */}
            <section className="bg-orange-50 mt-24 py-24 px-6 border-t border-orange-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Stories of Resilience</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Not every animal is ready for adoption yet. Some of our rescues require ongoing sponsorship, while others have already found their happily-ever-after. Read their incredible journeys.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {storyAnimals.map((animal, idx) => (
                            <div key={idx} className="bg-white card !p-0 overflow-hidden flex flex-col group border border-gray-100 hover:border-primary/30 transition-all duration-300 shadow-lg">
                                <div className="relative overflow-hidden h-72">
                                    <img src={animal.image} alt={animal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {animal.status}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-end mb-4">
                                        <h2 className="text-3xl font-black text-gray-900">{animal.name}</h2>
                                    </div>
                                    <div className="flex gap-2 mb-6">
                                        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{animal.breed}</span>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{animal.age}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{animal.story}</p>
                                    
                                    {animal.status === "Happily Adopted!" ? (
                                        <button disabled className="w-full py-4 rounded-xl bg-gray-100 text-gray-400 font-bold cursor-not-allowed border border-gray-200">
                                            Found a Forever Home
                                        </button>
                                    ) : (
                                        <button onClick={() => navigate('/donate')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
                                            Sponsor Their Care
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Adoption;