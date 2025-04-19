import React, { useState, useEffect } from 'react';
import ResepAccordion from '../components/ResepAccordion';
import ResepFilter from '../components/ResepFilter';
import AddResepModal from '../components/AddResepModal';
import './Home.css';

const Home = () => {
  const [resepList, setResepList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchResep = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { page = 1, limit = 5, kategori = '', kesulitan = '' } = filters;
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(kategori && { kategori }),
        ...(kesulitan && { kesulitan })
      }).toString();
      
      const response = await fetch(`http://localhost/api/resep?${queryParams}`);
      if (!response.ok) throw new Error('Gagal memuat resep');
      
      const data = await response.json();
      setResepList(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResep();
  }, []);

  const handleFilterChange = (filters) => {
    fetchResep(filters);
  };

  const handlePageChange = (newPage) => {
    fetchResep({ ...pagination, page: newPage });
  };

  const handleAddResep = async (newResep) => {
    try {
      const response = await fetch('http://localhost/api/resep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResep),
      });
      
      if (!response.ok) throw new Error('Gagal menambahkan resep');
      
      // Refresh the list
      fetchResep(pagination);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="home-container">
      <h1>Resep Makanan Nusantara</h1>
      <p>Koleksi resep tradisional Indonesia untuk UMKM digital</p>
      
      <div className="controls">
        <ResepFilter 
          onFilterChange={handleFilterChange} 
          onPageChange={handlePageChange} 
        />
        <button 
          className="add-resep-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Tambah Resep
        </button>
      </div>
      
      {isLoading && <div className="loading">Memuat resep...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="resep-list">
        {resepList.length > 0 ? (
          resepList.map(resep => (
            <ResepAccordion key={resep.id} resep={resep} />
          ))
        ) : (
          !isLoading && <div className="empty-message">Tidak ada resep ditemukan</div>
        )}
      </div>
      
      {resepList.length > 0 && (
        <div className="pagination">
          <button 
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <button 
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
      
      <AddResepModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddResep}
      />
    </div>
  );
};

export default Home;