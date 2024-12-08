import { useEffect, useState } from "react";
import http from "../Utils/http";
import Cookies from "js-cookie";
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useSpareParts = () => {
  const [sparePartsList, setSparePartsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pageCount, currentPage, pageSize, setCurrentPage, updatePageCount } =
    usePagination();

  useEffect(() => {
    fetchSpares(currentPage + 1); // Fetch the first page initially
  }, [currentPage, pageSize]); // Include pageSize in the dependency array

  const fetchSpares = async (page, searchQuery = "") => {
    try {
      const response = await http.get(
        `/spareParts?page=${page}&size=${pageSize}&q=${searchQuery}`
      );
      setSparePartsList(response.data.data);
      updatePageCount(Math.ceil(response.data.total / pageSize));
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const { searchRequests } = useSearchRequest(fetchSpares);

  return {
    sparePartsList,
    setSparePartsList,
    isLoading,
    error,
    fetchSpares,
    currentPage,
    pageCount,
    handlePageClick,
    searchRequests,
  };
};

export default useSpareParts;
