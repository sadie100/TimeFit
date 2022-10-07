import React, { useContext } from "react";
import axios from "axios";
import { LoadingContext } from "contexts/loadingContext";
// method: "post",
//         url: "/upload-equipment",
//         data: formData,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
const useApiController = ({ url, method, data, ...props }) => {
  const instance = axios.create({
    url: url,
    method,
    data,
    ...props,
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

export default useApiController;
