import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ooops! Something went wrong.");
        }

        setIsLoading(false);
        return data;
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    },
    []
  );

  return [ request, isLoading ];
};

export default useHttp;
