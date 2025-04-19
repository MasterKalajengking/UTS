import React, { useState } from 'react';
import './ResepAccordion.css';

const ResepAccordion = ({ resep }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="resep-accordion">
      <div className="resep-header">
        <h2>{resep.nama}</h2>
        <p>Kategori: {resep.kategori} | Kesulitan: {resep.kesulitan}</p>
      </div>
      
      <div className="accordion-section">
        <button 
          className={`accordion-btn ${activeIndex === 0 ? 'active' : ''}`}
          onClick={() => toggleAccordion(0)}
        >
          Bahan-bahan
        </button>
        <div className={`accordion-content ${activeIndex === 0 ? 'show' : ''}`}>
          <ul>
            {JSON.parse(resep.bahan).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="accordion-section">
        <button 
          className={`accordion-btn ${activeIndex === 1 ? 'active' : ''}`}
          onClick={() => toggleAccordion(1)}
        >
          Langkah-langkah
        </button>
        <div className={`accordion-content ${activeIndex === 1 ? 'show' : ''}`}>
          <ol>
            {JSON.parse(resep.langkah).map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ResepAccordion;