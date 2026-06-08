import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-[#071513] text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-12">
                <div className="space-y-4">
                    <img src="/footer-logo.svg" alt="Pyaar Foundation" className="h-16 w-auto" />
                    <p className="text-sm leading-relaxed text-slate-400">
                        We rescue, rehabilitate, vaccinate, sterilise, and rehome animals with dignity, urgency, and transparent community support.
                    </p>
                    <div className="flex items-center gap-4 text-slate-400">
                        <a href="#" className="hover:text-white transition"><FaFacebook size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaTwitter size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaInstagram size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaLinkedin size={18} /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300 mb-6">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link to="/gallery" className="hover:text-white transition">Gallery</Link></li>
                        <li><Link to="/donate" className="hover:text-white transition">Donate</Link></li>
                        <li><Link to="/team" className="hover:text-white transition">Volunteer</Link></li>
                        <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300 mb-6">Programs</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/service" className="hover:text-white transition">Rescue</Link></li>
                        <li><Link to="/adoption" className="hover:text-white transition">Adoption</Link></li>
                        <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300 mb-6">Contact</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li>Near pipeline Vichoda, Chhota</li>
                        <li>Nagpur,Chandrapur,Maharashtra,442406, India</li>
                        <li><a href="mailto:contact@pyaarfoundation.org" className="hover:text-white transition">contact@pyaarfoundation.org</a></li>
                        <li>+91 75888 93939</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Pyaar Foundation. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
