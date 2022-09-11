import { useState, useEffect, createContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const LoadingContext = createContext({
  startLoading: () => {},
  endLoading: () => {},
});

const LoadingContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const endLoading = () => {
    setLoading(false);
  };
  axios.interceptors.request.use(() => {
    return startLoading();
  });
  axios.interceptors.response.use(
    (response) => {
      return endLoading();
    },
    (error) => {
      return endLoading();
    }
  );
  return (
    <LoadingContext.Provider
      value={{
        startLoading,
        endLoading,
      }}
    >
      {loading ? <CircularProgress /> : props.children}
    </LoadingContext.Provider>
  );
};
export default LoadingContextProvider;
