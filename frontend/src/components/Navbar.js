import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLock, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ theme, setTheme }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    const closeMenu = () => setIsMenuOpen(false);

    const links =[
        { name: 'Home', path: '/' }, { name: 'About', path: '/about' },
        { name: 'Events', path: '/events' }, { name: 'Adoption', path: '/adoption' }, 
        { name: 'Service', path: '/service' }, { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-darkBg/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
                
                {/* Logo Left */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-3 z-50 group">
                    <img src="https://tse3.mm.bing.net/th/id/OIP.MyzAz_NxRo13fvQY9B7w5AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Logo" className="w-20 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Rise for Tails</span>
                </Link>

                {/* Links Right */}
                <div className="hidden lg:flex items-center space-x-8">
                    <ul className="flex items-center space-x-8">
                        {links.map(link => (
                            <li key={link.name}>
                                <Link 
                                    to={link.path} 
                                    className={`text-sm font-medium transition-all duration-200 relative group ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full transition-all duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4 pl-6 border-l border-gray-200 dark:border-gray-700">
                        <button onClick={toggleTheme} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
                            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>
                        <Link to="/admin" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
                            <FaLock size={16} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 lg:hidden z-50">
                    <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
                        {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 dark:text-white p-2">
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-darkBg border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <ul className="flex flex-col p-6 space-y-4">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link to={link.path} onClick={closeMenu} className={`block text-lg font-medium ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link to="/admin" onClick={closeMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                            <FaLock size={16} /> Admin Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;