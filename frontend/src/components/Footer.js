import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-darkCard border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-1">
                    <Link to="/" className="flex items-center gap-3 mb-4">
                        <img src="/logo192.png" alt="Logo" className="w-8 h-8 rounded-full" />
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Rise for Tails</span>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                        Dedicated to rescuing, rehabilitating, and rehoming animals. Giving every animal a chance to live and be loved.
                    </p>
                    <div className="flex space-x-4 text-gray-400">
                        <a href="#" className="hover:text-primary transition-colors"><FaFacebook size={20}/></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaTwitter size={20}/></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaInstagram size={20}/></a>
                        <a href="#" className="hover:text-primary transition-colors"><FaLinkedin size={20}/></a>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/adoption" className="hover:text-primary transition-colors">Adopt a Pet</Link></li>
                        <li><Link to="/donate" className="hover:text-primary transition-colors">Make a Donation</Link></li>
                        <li><Link to="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link to="/book-a-slot" className="hover:text-primary transition-colors">Book Animal Therapy</Link></li>
                        <li><Link to="/book-a-slot" className="hover:text-primary transition-colors">Pet Cremation</Link></li>
                        <li><Link to="/service" className="hover:text-primary transition-colors">Medical Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li>Rise for Tails Rescue Centre</li>
                        <li>Nagpur, Maharashtra, India</li>
                        <li>contact@risefortails.org</li>
                        <li>+91 98765 43210</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Rise for Tails. All rights reserved.</p>
                <div className="space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;