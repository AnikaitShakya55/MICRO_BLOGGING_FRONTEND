import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../redux/snackbarSlice";

type FetchResponse = any;

const usePostFetch = (url: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postLoader, setPostLoader] = useState<boolean>(false);
  const [postError, setPostError] = useState<string | null>(null);

  const postData = async (
    data: any,
    snackbarExpected?: boolean
  ): Promise<FetchResponse> => {
    try {
      setPostLoader(true);
      setPostError(null);

      console.log("process.env.REACT_APP_BACKEND_URL_ENDPOINT", data);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL_ENDPOINT}${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const responseData: any = await response.json();

      if (response.status === 200) {
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: responseData.message, severity: "success" })
          );
        return responseData;
      } else if (response.status === 401) {
        navigate("/login", { state: { sessionExpired: true } });
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: responseData.message, severity: "error" })
          );
        return;
      } else {
        if (snackbarExpected)
          dispatch(
            showSnackbar({ message: responseData.message, severity: "error" })
          );
      }
    } catch (error) {
      console.error("Error in postData Custom Hook:", error);
      setPostError("Unexpected Error occured. Please try again Later");
    } finally {
      setPostLoader(false);
    }
  };

  return {
    postLoader,
    postError,
    postData,
  };
};

export default usePostFetch;
