import { useEffect, useState } from "react";
import http from "../Utils/http";
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useUserList = () => {
  const [UserList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pageCount, currentPage, pageSize, setCurrentPage, updatePageCount } =
    usePagination();

  useEffect(() => {
    fetchUserList(currentPage + 1);
  }, [currentPage, pageSize]);

  const fetchUserList = async (page, searchQuery = "") => {
    try {
      setIsLoading(false);
      const response = await http.get(
        `/auth/users?page=${page}&size=${pageSize}&q=${searchQuery}`
      );
      setUserList(response.data.data);
      updatePageCount(Math.ceil(response.data.total / pageSize));
      console.log(response.data);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const { searchRequests } = useSearchRequest(fetchUserList);

  return {
    UserList,
    setUserList,
    isLoading,
    error,
    fetchUserList,
    currentPage,
    pageCount,
    handlePageClick,
    searchRequests,
  };
};

export default useUserList;
