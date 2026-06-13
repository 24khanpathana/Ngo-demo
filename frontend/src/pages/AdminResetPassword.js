import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormPages.css';
import api from '../utils/api';

const AdminResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (!token) {
            return setError('Invalid password reset token');
        }

        setLoading(true);
        try {
            const res = await api.post('/api/auth/reset-password', { 
                token, 
                password 
            });
            setMessage(res.data.message);
            setTimeout(() => {
                navigate('/admin-login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'The token is invalid or has expired.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="form-page-container">
                <div className="form-container card-theme">
                    <h2 className="form-title text-primary-theme">Invalid Request</h2>
                    <p className="form-message error">Reset token is missing from the URL.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page-container">
            <div className="form-container card-theme">
                <h2 className="form-title text-primary-theme">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control" 
                            required 
                            placeholder="Enter new password"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="form-control" 
                            required 
                            placeholder="Confirm new password"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="button-primary" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p className="form-message success" style={{ color: '#9A5734', marginTop: '10px' }}>{message}</p>}
                {error && <p className="form-message error">{error}</p>}
            </div>
        </div>
    );
};

export default AdminResetPassword;
