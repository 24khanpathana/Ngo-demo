import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        
        try {
            const res = await api.post('/api/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-mist px-4 py-12 dark:bg-darkBg">
            <div className="card w-full max-w-md">
                <div className="mb-8 text-center">
                    <img src="/footor-1.svg" alt="Pyaar Foundation logo" className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain shadow-lg shadow-primary/20" />
                    <h2 className="section-title !text-3xl">Forgot Password</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Enter your admin email and we will send a reset link.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="input-field" 
                            required 
                            placeholder="Enter your registered email"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <div className="text-center">
                        <Link to="/admin-login" className="text-sm font-semibold text-primary transition hover:text-primaryHover hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
                {message && <p className="mt-5 rounded-2xl bg-primary/10 p-4 text-center font-medium text-primary">{message}</p>}
                {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-center font-medium text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default AdminForgotPassword;
