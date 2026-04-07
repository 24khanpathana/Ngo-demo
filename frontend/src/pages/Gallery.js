import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Gallery = () => {
    const [content, setContent] = useState([]);

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`)
            .then(res => setContent(res.data.filter(c => c.page === 'Gallery')))
            .catch(err => console.error("Failed to fetch gallery:", err));
    },[]);

    return (
        <section className="page-section container">
            <h1 className="section-title">Gallery</h1>
            <div className="grid-container grid-3">
                {content.map(item => (
                    <div key={item._id} className="card" style={{padding: '10px'}}>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="content-image" style={{height: '250px', marginBottom: '10px'}} />}
                        <h3 style={{textAlign: 'center', fontSize: '1.1rem'}}>{item.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Gallery;