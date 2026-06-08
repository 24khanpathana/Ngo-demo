import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPages.css';
import api from '../utils/api';

const AdminForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        <div className="form-page-container">
            <div className="form-container card-theme">
                <h2 className="form-title text-primary-theme">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" 
                            required 
                            placeholder="Enter your registered email"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="button-primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <div className="form-group" style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button type="button" onClick={() => navigate('/admin-login')} className="button-secondary" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            Back to Login
                        </button>
                    </div>
                </form>
                {message && <p className="form-message success" style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
                {error && <p className="form-message error">{error}</p>}
            </div>
        </div>
    );
};

export default AdminForgotPassword;
