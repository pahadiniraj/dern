import { useEffect, useState } from "react";
import http from "../Utils/http";

const useDashboard = () => {
  const [dashboardList, setdashboardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchDashboardLists();
  }, []);
  

  const fetchDashboardLists = async () => {
    try {
      const response = await http.get(`/dashboard`);
      console.log(response);
      setdashboardList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { dashboardList, setdashboardList, isLoading, error, fetchDashboardLists };
};

export default useDashboard;
