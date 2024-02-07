import React from 'react';
import './styles/pagination.css';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className='pagination'>
      <button onClick={handlePrev}>Prev</button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Pagination;
