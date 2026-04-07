// Import the component at the top
import Adoption from './pages/Adoption';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Service from './pages/Service';
import Contact from './pages/Contact';

import SlotBooking from './pages/SlotBooking';
import Gallery from './pages/Gallery';
import Donation from './pages/Donation';
import AdminLogin from './pages/AdminLogin';
import AdminForgotPassword from './pages/AdminForgotPassword';
import AdminResetPassword from './pages/AdminResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import { AuthProvider } from './context/AuthContext';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AuthProvider>
            <Router>
                <Navbar theme={theme} setTheme={setTheme} />
                <div style={{ paddingTop: '80px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/service" element={<Service />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/adoption" element={<Adoption />} />
                        {/* ... inside your <Routes> add this: */}
                        <Route path="/adoption-animals" element={<Adoption />} />
                        <Route path="/book-a-slot" element={<SlotBooking />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/donate" element={<Donation />} />
                        
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
                        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />

                        
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}



export default App;