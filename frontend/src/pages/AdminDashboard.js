import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    
    // Manage active tab
    const [activeTab, setActiveTab] = useState('content');
    
    // Data states
    const[contents, setContents] = useState([]);
    const [animals, setAnimals] = useState([]);
    const[overviewData, setOverviewData] = useState({ slots: [], volunteers: [], donations: [], feedback: [], complaints:[] });
    
    // Content Form States
    const [selectedPage, setSelectedPage] = useState('Home');
    const[formData, setFormData] = useState({ title: '', description: '', imageUrl: '', date: '', role: '' });
    const [editingId, setEditingId] = useState(null);
    const[customFields, setCustomFields] = useState([]);
    const [addCustomForm, setAddCustomForm] = useState(false);

    // Animal Form States
    const [animalData, setAnimalData] = useState({ name: '', age: '', breed: '', description: '', imageUrl: '' });
    const [editingAnimalId, setEditingAnimalId] = useState(null);

    const api = axios.create({ baseURL: process.env.REACT_APP_API_URL, headers: { Authorization: `Bearer ${token}` } });

    const fetchAllData = async () => {
        try {
            const[contentRes, animalRes, slotsRes, volRes, donRes, feedRes, compRes] = await Promise.all([
                api.get('/api/content'), api.get('/api/animals'), api.get('/api/slots'), api.get('/api/volunteers'), api.get('/api/donations'), api.get('/api/feedback'), api.get('/api/complaints')
            ]);
            setContents(contentRes.data);
            setAnimals(animalRes.data);
            setOverviewData({ slots: slotsRes.data, volunteers: volRes.data, donations: donRes.data, feedback: feedRes.data, complaints: compRes.data });
        } catch (error) { if (error.response?.status === 401) handleLogout(); }
    };

    useEffect(() => { fetchAllData(); }, [token]);

    const handleLogout = () => {
        logout();        // Clears session token
        navigate('/');   // Redirects to Home Page
    };

    // --- Content Handlers ---
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, page: selectedPage };
        if (addCustomForm && selectedPage === 'Service') payload.customForm = { title: formData.title, fields: customFields };
        
        try {
            if (editingId) await api.put(`/api/content/${editingId}`, payload);
            else await api.post('/api/content', payload);
            
            setFormData({ title: '', description: '', imageUrl: '', date: '', role: '' });
            setCustomFields([]); setAddCustomForm(false); setEditingId(null);
            fetchAllData();
        } catch (error) { alert('Error saving content'); }
    };

    const handleContentDelete = async (id) => {
        if(window.confirm('Delete this item?')) {
            await api.delete(`/api/content/${id}`);
            fetchAllData();
        }
    };

    const editContentItem = (item) => {
        setEditingId(item._id);
        setFormData({ title: item.title, description: item.description, imageUrl: item.imageUrl, date: item.date ? item.date.split('T')[0] : '', role: item.role || '' });
        if(item.customForm && item.customForm.fields) {
            setAddCustomForm(true); setCustomFields(item.customForm.fields);
        }
    };

    // --- Animal Handlers ---
    const handleAnimalSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAnimalId) await api.put(`/api/animals/${editingAnimalId}`, animalData);
            else await api.post('/api/animals', animalData);
            
            setAnimalData({ name: '', age: '', breed: '', description: '', imageUrl: '' });
            setEditingAnimalId(null);
            fetchAllData();
        } catch (error) { alert('Error saving animal'); }
    };

    const handleAnimalDelete = async (id) => {
        if(window.confirm('Delete this animal?')) {
            await api.delete(`/api/animals/${id}`);
            fetchAllData();
        }
    };

    const editAnimal = (animal) => {
        setEditingAnimalId(animal._id);
        setAnimalData({ name: animal.name, age: animal.age, breed: animal.breed, description: animal.description, imageUrl: animal.imageUrl });
    };

    // --- Renderers ---
    const renderTable = (items, headers) => (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead><tr>{Object.keys(headers).map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            {Object.keys(headers).map(key => <td key={key}>{item[headers[key]]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderAdoptionManager = () => (
        <div className="card">
            <h2 style={{color: 'var(--primary-light)', marginBottom: '20px'}}>Adoption Animals Manager</h2>
            <div className="admin-form-box">
                <h3 style={{marginBottom: '20px'}}>{editingAnimalId ? 'Edit Animal' : 'Add New Animal'}</h3>
                <form onSubmit={handleAnimalSubmit}>
                    <div className="grid-container grid-2">
                        <div className="form-group"><label>Name</label><input type="text" className="form-control" required value={animalData.name} onChange={e => setAnimalData({...animalData, name: e.target.value})} /></div>
                        <div className="form-group"><label>Age</label><input type="text" className="form-control" required value={animalData.age} onChange={e => setAnimalData({...animalData, age: e.target.value})} placeholder="e.g. 2 Months, 3 Years" /></div>
                        <div className="form-group"><label>Breed</label><input type="text" className="form-control" required value={animalData.breed} onChange={e => setAnimalData({...animalData, breed: e.target.value})} /></div>
                        <div className="form-group"><label>Image URL</label><input type="text" className="form-control" required value={animalData.imageUrl} onChange={e => setAnimalData({...animalData, imageUrl: e.target.value})} /></div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" required value={animalData.description} onChange={e => setAnimalData({...animalData, description: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="button-primary" style={{marginTop: '20px'}}>{editingAnimalId ? 'Update' : 'Save'} Animal</button>
                </form>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Image</th><th>Name</th><th>Age/Breed</th><th>Actions</th></tr></thead>
                    <tbody>
                        {animals.map(animal => (
                            <tr key={animal._id}>
                                <td><img src={animal.imageUrl} alt={animal.name} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'8px'}} /></td>
                                <td>{animal.name}</td>
                                <td>{animal.age} / {animal.breed}</td>
                                <td>
                                    <button onClick={() => editAnimal(animal)} className="action-btn edit">✎ Edit</button>
                                    <button onClick={() => handleAnimalDelete(animal._id)} className="action-btn delete">🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContentManager = () => (
        <div className="card">
            <h2 style={{color: 'var(--primary-light)', marginBottom: '20px'}}>Content Manager</h2>
            <div className="form-group">
                <label>Select Page to Manage</label>
                <select value={selectedPage} onChange={e => { setSelectedPage(e.target.value); setEditingId(null); setAddCustomForm(false); }} className="form-control" style={{maxWidth: '300px'}}>
                    {['Home', 'About', 'Team', 'Event', 'Service', 'Contact', 'Gallery'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            {/* Same form box content as previous prompt */}
            <div className="admin-form-box">
                <h3 style={{marginBottom: '20px'}}>{editingId ? 'Edit Item' : `Add New to ${selectedPage}`}</h3>
                <form onSubmit={handleContentSubmit}>
                    <div className="grid-container grid-2">
                        <div className="form-group">
                            <label>{selectedPage === 'Team' ? 'Member Name' : 'Title'}</label>
                            <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        {['Home', 'About', 'Event', 'Service', 'Contact'].includes(selectedPage) && (
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" className="form-control" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                        </div>
                        {selectedPage === 'Event' && (
                            <div className="form-group">
                                <label>Event Date</label>
                                <input type="date" className="form-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                            </div>
                        )}
                        {selectedPage === 'Team' && (
                            <div className="form-group">
                                <label>Role</label>
                                <input type="text" className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                            </div>
                        )}
                    </div>
                    {selectedPage === 'Service' && !editingId && (
                        <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-light)'}}>
                            <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                                <input type="checkbox" checked={addCustomForm} onChange={e => setAddCustomForm(e.target.checked)} />
                                <strong>Attach Custom Form (Max 5 Fields)</strong>
                            </label>
                            {addCustomForm && (
                                <div style={{marginTop: '15px'}}>
                                    {customFields.map((field, idx) => (
                                        <div key={idx} style={{display: 'flex', gap: '15px', marginBottom: '10px'}}>
                                            <input placeholder="Field Name" className="form-control" required value={field.name} onChange={e => { const newF = [...customFields]; newF[idx].name = e.target.value; setCustomFields(newF); }} />
                                            <select className="form-control" value={field.type} onChange={e => { const newF = [...customFields]; newF[idx].type = e.target.value; setCustomFields(newF); }}>
                                                <option value="text">Text</option><option value="email">Email</option><option value="number">Number</option>
                                            </select>
                                        </div>
                                    ))}
                                    {customFields.length < 5 && <button type="button" onClick={() => setCustomFields([...customFields, {name:'', type:'text'}])} style={{background:'none', border:'none', color:'var(--primary-light)', cursor:'pointer', fontWeight:'bold'}}>+ Add Field</button>}
                                </div>
                            )}
                        </div>
                    )}
                    <button type="submit" className="button-primary" style={{marginTop: '20px'}}>{editingId ? 'Update' : 'Save'} Content</button>
                </form>
            </div>
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Details</th><th>Actions</th></tr></thead>
                    <tbody>
                        {contents.filter(c => c.page === selectedPage).map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.role || (item.date ? new Date(item.date).toLocaleDateString() : 'N/A')}</td>
                                <td>
                                    <button onClick={() => editContentItem(item)} className="action-btn edit">✎ Edit</button>
                                    <button onClick={() => handleContentDelete(item._id)} className="action-btn delete">🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch(activeTab) {
            case 'content': return renderContentManager();
            case 'adoption': return renderAdoptionManager();
            case 'slots': return renderTable(overviewData.slots, { Name: 'name', Mobile: 'mobile', Date: 'date', 'Time Slot': 'timeSlot' });
            case 'volunteers': return renderTable(overviewData.volunteers, { Name: 'name', Email: 'email', Mobile: 'mobile', Skills: 'skills' });
            case 'donations': return renderTable(overviewData.donations, { Name: 'name', Mobile: 'mobile', Amount: 'amount', 'Payment ID': 'razorpay_payment_id' });
            case 'feedback': return renderTable(overviewData.feedback, { Name: 'name', Email: 'email', Feedback: 'feedback' });
            case 'complaints': return renderTable(overviewData.complaints, { Name: 'name', Email: 'email', Complaint: 'complaint' });
            default: return null;
        }
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav className="admin-nav">
                    <button onClick={() => setActiveTab('content')} className={`admin-nav-btn ${activeTab === 'content' ? 'active' : ''}`}>Content Manager</button>
                    <button onClick={() => setActiveTab('adoption')} className={`admin-nav-btn ${activeTab === 'adoption' ? 'active' : ''}`}>Adoption Animals</button>
                    <button onClick={() => setActiveTab('slots')} className={`admin-nav-btn ${activeTab === 'slots' ? 'active' : ''}`}>Slot Bookings</button>
                    <button onClick={() => setActiveTab('volunteers')} className={`admin-nav-btn ${activeTab === 'volunteers' ? 'active' : ''}`}>Volunteers</button>
                    <button onClick={() => setActiveTab('donations')} className={`admin-nav-btn ${activeTab === 'donations' ? 'active' : ''}`}>Donations</button>
                    <button onClick={() => setActiveTab('feedback')} className={`admin-nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}>Feedback</button>
                    <button onClick={() => setActiveTab('complaints')} className={`admin-nav-btn ${activeTab === 'complaints' ? 'active' : ''}`}>Complaints</button>
                </nav>
                <button onClick={handleLogout} className="admin-logout">Logout</button>
            </aside>
            <main className="admin-main">
                {renderTabContent()}
            </main>
        </div>
    );
};
export default AdminDashboard;