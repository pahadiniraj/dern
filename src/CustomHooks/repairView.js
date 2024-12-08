import { useEffect, useState } from "react";
import http from "../Utils/http";
import { useParams } from "react-router";
import usePagination from "./usePagination";

const useRepairView = () => {
  const { id } = useParams();
  const [repairList, setrepairList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRepairLists();
  }, []);

  const fetchRepairLists = async () => {
    try {
      const response = await http.get(`/repairItems/${id}`);
      console.log(response);
      setrepairList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { repairList, setrepairList, isLoading, error, fetchRepairLists };
};

export default useRepairView;
