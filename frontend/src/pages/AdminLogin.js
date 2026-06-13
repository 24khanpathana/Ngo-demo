import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ adminId: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault(); setError('');
        try {
            const res = await api.post('/api/auth/login', formData);
            login(res.data.token); navigate('/admin/dashboard');
        } catch (err) { setError(err.response?.data?.message || 'Login failed'); }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-mist p-4 dark:bg-darkBg">
            <div className="card w-full max-w-md">
                <div className="mb-8 text-center">
                    <img src="/footor-1.svg" alt="Pyaar Foundation logo" className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain shadow-lg shadow-primary/20" />
                    <h2 className="section-title !text-3xl">Admin Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                        <input type="email" required className="input-field" onChange={e => setFormData({...formData, adminId: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input type="password" required className="input-field" onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <button type="submit" className="btn-primary w-full">Login</button>
                    <div className="text-center mt-4">
                        <a href="/admin/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</a>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
            </div>
        </div>
    );
};
export default AdminLogin;
