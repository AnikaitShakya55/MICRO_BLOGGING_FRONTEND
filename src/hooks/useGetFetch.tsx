import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../redux/snackbarSlice";

type FetchedResponse = any;

const useGetFetch = (url: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getLoader, setGetLoader] = useState<boolean>(false);

  const fetchGetData = async (
    snackbarExpected?: boolean
  ): Promise<FetchedResponse> => {
    try {
      setGetLoader(true);

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL_ENDPOINT}${url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const resData: any = await res.json();
      console.log(resData);
      if (res.status === 200) {
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: resData.message, severity: "success" })
          );
        return resData;
      } else if (res.status === 401) {
        navigate("/login", { state: { sessionExpired: true } });
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: resData.message, severity: "error" })
          );
        return;
      } else {
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: resData.message, severity: "error" })
          );
        return resData;
      }
    } catch (error) {
      console.log("GET CUSTOM HOOK ERROR:", error);
    } finally {
      setGetLoader(false);
    }
  };

  return { getLoader, fetchGetData };
};

export default useGetFetch;
