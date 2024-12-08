import { useState } from "react";

const useSearchRequest = (fetchList) => {
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchRequests = (searchQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeoutId = setTimeout(() => {
      fetchList(1, searchQuery);
    }, 1000);

    setSearchTimeout(timeoutId);
  };
  return {
    searchRequests,
  };
};

export default useSearchRequest;
