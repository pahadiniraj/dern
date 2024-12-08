import { useEffect, useState } from "react";
import http from "../Utils/http";
import usePagination from "./usePagination";
import useSearchRequest from "./HelperHooks/searchRequest";

const useUserInfoList = () => {
  const [userinfo, setuserinfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchuserinfo();
  }, []);

  const fetchuserinfo = async () => {
    try {
      const res = await http.get(
        `/auth/user`
      );
      setuserinfo(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { userinfo, isLoading, error, fetchuserinfo };
};

export default useUserInfoList;
