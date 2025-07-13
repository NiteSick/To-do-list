import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";
import { ApiServicePrivate } from "../service/Axios";

const useAxiosPrivate = () => {
  const refresh = useRefresh();

  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = ApiServicePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseInterceptor = ApiServicePrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return ApiServicePrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      ApiServicePrivate.interceptors.response.eject(responseInterceptor);
      ApiServicePrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]);

  return ApiServicePrivate;
};

export default useAxiosPrivate;
