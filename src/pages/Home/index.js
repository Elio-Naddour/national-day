import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './home.css';
import { ClusterPattern } from '../../components/patterns/patterns';

const HomePage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/QnA/${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div>
        <div className="container">
        <div className="guideline-card">        
            <div className="input-section">
            <h3>أدخل اسمك للمشاركة</h3>
            <form onSubmit={handleSubmit} className="name-form">
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب اسمك هنا"
                className="name-input"
                />
                <button type="submit" className="submit-btn">تقديم</button>
            </form>
            </div>
        </div>
        <div className='pattern-card'>
            <ClusterPattern />
        </div>
        </div>
    </div>
  );
};

export default HomePage;