import { useEffect, useState } from "react";
import http from "../Utils/http";
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useDailyJob = () => {
  const [dailyJobList, setDailyJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //usepagination hooks
  const { pageCount, currentPage, pageSize, setCurrentPage, updatePageCount } =
    usePagination();

  useEffect(() => {
    fetchDailyJobLists(currentPage + 1);
  }, [currentPage, pageSize]);

  const fetchDailyJobLists = async (page, searchQuery = "") => {
    try {
      const response = await http.get(
        `/dailyJob?page=${page}&size=${pageSize}&q=${searchQuery}`
      );
      setDailyJobList(response.data.data);
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
  const { searchRequests } = useSearchRequest(fetchDailyJobLists);

  return {
    dailyJobList,
    setDailyJobList,
    isLoading,
    error,
    fetchDailyJobLists,
    handlePageClick,
    currentPage,
    pageCount,
    searchRequests,
  };
};

export default useDailyJob;
