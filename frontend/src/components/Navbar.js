import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLock } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ theme, setTheme }) => {
    const location = useLocation();
    
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

// ... existing imports ...
    const links =[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Team', path: '/team' },
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Service', path: '/service' },
        { name: 'Adoption', path: '/adoption' }, // <-- NEW
        { name: 'Contact', path: '/contact' }
    ];
// ... rest of Navbar.js ...

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Rise for Tails</Link>
                <ul className="nav-menu">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-icons">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                    <Link to="/admin" className="admin-button">
                        <FaLock />
                        <span>Admin</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;