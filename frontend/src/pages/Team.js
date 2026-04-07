import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
    const[team, setTeam] = useState([]);
    useEffect(() => { axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => setTeam(res.data.filter(c => c.page === 'Team'))); },[]);

    return (
        <div className="w-full font-sans text-gray-800 bg-white min-h-screen pb-20">
            <div className="bg-emerald-900 text-white py-16 md:py-24 text-center px-4 mb-16">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Meet Our Team</h1>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">The dedicated individuals behind Rise for Tails making a difference every single day.</p>
            </div>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {team.map(member => (
                        <div key={member._id} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center hover:-translate-y-2 transition duration-300">
                            <img src={member.imageUrl || 'https://via.placeholder.com/150'} alt={member.title} className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-emerald-100 shadow-md" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.title}</h3>
                            <p className="text-orange-600 font-bold mb-4">{member.role}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Team;