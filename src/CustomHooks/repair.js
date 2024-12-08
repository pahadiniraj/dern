import { useEffect, useState } from "react";
import http from "../Utils/http";
import Cookies from 'js-cookie';
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useRepair = () => {
   const [repairList, setRepairList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   const { pageCount, currentPage, pageSize, setCurrentPage, updatePageCount } = usePagination();

   useEffect(() => {

     fetchRepairLists(currentPage + 1); // Fetch the first page initially
   }, [currentPage, pageSize]); // Include pageSize in the dependency array

   const fetchRepairLists = async (page, searchQuery = "") => {
     try {
       const response = await http.get(`/repairItems?page=${page}&size=${pageSize}&q=${searchQuery}`);
       setRepairList(response.data.allrepair);
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
   const { searchRequests } = useSearchRequest(fetchRepairLists);

   return {
     repairList,
     setRepairList,
     isLoading,
     error,
     fetchRepairLists,
     currentPage,
     pageCount,
     handlePageClick,
     searchRequests
   };
};

export default useRepair;
