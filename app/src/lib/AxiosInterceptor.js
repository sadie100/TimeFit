import React, { useContext } from "react";
import axios from "axios";
import { LoadingContext } from "contexts/adingContext";

const ApiController = ({ url, method, data }) => {
  const instance = axios.create({
    baseUrl: url,
    method,
    data,
    timeout: 1000,
  });
  const { startLoading, endLoading } = useContext(LoadingContext);

  instance.interceptors.request.use(
    () => {
      return startLoading();
    },
    () => {}
  );
  instance.interceptors.response.use(
    (response) => {
      return endLoading();
    },
    (error) => {
      return endLoading();
    }
  );
};

export default ApiController;
