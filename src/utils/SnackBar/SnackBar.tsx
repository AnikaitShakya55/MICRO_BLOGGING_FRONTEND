import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { hideSnackbar } from "../../redux/snackbarSlice";
import { RootState } from "../../redux/store";

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
