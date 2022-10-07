//axios interceptor 이용하는 커스텀 훅

import React, { useContext } from "react";
import axios from "axios";
import { LoadingContext } from "contexts/loadingContext";
import { useAuth } from "hooks/useAuthContext";
import { useLoading } from "hooks/useLoadingContext";

const useAxiosInterceptor = () => {
  const { accessToken } = useAuth();
  const { startLoading, endLoading } = useLoading();

  const instance = axios.create({
    //timeout: 1000,
  });

  instance.interceptors.request.use(
    (config) => {
      startLoading();
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      endLoading();
      return response;
    },
    (error) => {
      console.log(error);
      endLoading();
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosInterceptor;
