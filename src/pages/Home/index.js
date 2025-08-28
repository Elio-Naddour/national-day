import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './home.css';
import Pattern from '../../components/patterns/patterns';
import Header from '../../components/header/header';

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
        <Header />

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
            <Pattern />
        </div>
        </div>
    </div>
  );
};

export default HomePage;