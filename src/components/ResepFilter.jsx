import React, { useState, useEffect } from 'react';

const ResepFilter = ({ onFilterChange, onPageChange }) => {
  const [filters, setFilters] = useState({
    kategori: '',
    kesulitan: '',
    page: 1,
    limit: 5
  });

  const kategoriOptions = ['Makanan Utama', 'Makanan Ringan', 'Minuman', 'Kue'];
  const kesulitanOptions = ['Mudah', 'Sedang', 'Sulit'];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filter changes
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    onPageChange(newPage);
  };

  return (
    <div className="resep-filter">
      <div className="filter-group">
        <label>Kategori:</label>
        <select name="kategori" value={filters.kategori} onChange={handleChange}>
          <option value="">Semua</option>
          {kategoriOptions.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Tingkat Kesulitan:</label>
        <select name="kesulitan" value={filters.kesulitan} onChange={handleChange}>
          <option value="">Semua</option>
          {kesulitanOptions.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Items per page:</label>
        <select 
          name="limit" 
          value={filters.limit} 
          onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value) }))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default ResepFilter;