import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const Adoption = () => {
    const[animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`).then(res => {
            setAnimals(res.data);
        });
    },[]);

    const handleAdoptClick = (animalName) => {
        alert(`Thank you for your interest in ${animalName}! Please visit our Contact page to proceed with the adoption process.`);
        navigate('/contact');
    };

    return (
        <section className="page-section container">
            <div className="page-intro">
                <h1 className="section-title">Adopt a Best Friend</h1>
                <p>Give a loving home to a rescued animal. Browse our available animals below and find your perfect companion.</p>
            </div>
            
            <div className="grid-container grid-3">
                {animals.map(animal => (
                    <div key={animal._id} className="adoption-card">
                        <img src={animal.imageUrl} alt={animal.name} className="adoption-image" />
                        <div className="adoption-info">
                            <h2 className="adoption-name">{animal.name}</h2>
                            <div className="adoption-meta">
                                <span><strong>Age:</strong> {animal.age}</span>
                                <span><strong>Breed:</strong> {animal.breed}</span>
                            </div>
                            <p className="adoption-desc">{animal.description}</p>
                            <button 
                                onClick={() => handleAdoptClick(animal.name)} 
                                className="button-primary adoption-btn"
                            >
                                Adopt Me
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {animals.length === 0 && (
                <p style={{textAlign: 'center', marginTop: '50px', fontSize: '1.2rem'}}>
                    No animals are currently available for adoption. Please check back later!
                </p>
            )}
        </section>
    );
};

export default Adoption;