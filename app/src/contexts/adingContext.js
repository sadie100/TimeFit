import { useState, useEffect, createContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const LoadingContext = createContext({
  loading: false,
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

  return (
    <LoadingContext.Provider
      value={{
        loading,
        startLoading,
        endLoading,
      }}
      {...props}
    ></LoadingContext.Provider>
  );
};
export default LoadingContextProvider;
