import ApiService from "../service/Axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await ApiService.get("/refresh", {
        withCredentials: true,
      });

      setAuth((prev: any) => ({
        ...prev,
        accessToken: response?.data?.accessToken,
      }));

      return response?.data?.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};
export default useRefresh;
