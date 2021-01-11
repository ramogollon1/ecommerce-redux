import { useState } from "react";

function usePagination(data: [], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentDataPage() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }
  function nextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jumpPage(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return {
    nextPage,
    prevPage,
    jumpPage,
    currentDataPage,
    currentPage,
    maxPage,
  };
}

export default usePagination;
