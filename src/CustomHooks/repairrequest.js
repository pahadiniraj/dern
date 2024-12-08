import { useEffect, useState } from "react";
import http from "../Utils/http";
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useRequest = () => {
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //usepagination hooks
  const { pageCount, currentPage, pageSize, setCurrentPage, updatePageCount } =
    usePagination();

  useEffect(() => {
    fetchRequestLists(currentPage + 1);
  }, [currentPage, pageSize]);

  const fetchRequestLists = async (page, searchQuery = "") => {
    try {
      const response = await http.get(
        `/request?page=${page}&size=${pageSize}&q=${searchQuery}`
      );
      setRequestList(response.data.data);
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

  //search Request hooks
  const { searchRequests } = useSearchRequest(fetchRequestLists);

  return {
    requestList,
    setRequestList,
    isLoading,
    error,
    fetchRequestLists,
    handlePageClick,
    currentPage,
    pageCount,
    searchRequests,
  };
};

export default useRequest;
