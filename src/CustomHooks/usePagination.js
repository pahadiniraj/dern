import { useState } from 'react';

const usePagination = (initialPageCount = 0, initialPageSize = 5) => {
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);


  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    console.log(event)
  };

  const updatePageCount = (newPageCount) => {
    console.log(newPageCount)
    setPageCount(newPageCount);
  };

  const updatePageSize = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return {
    pageCount,
    currentPage,
    setCurrentPage,
    pageSize,
    handlePageClick,
    updatePageCount,
    updatePageSize
  };
};

export default usePagination;
