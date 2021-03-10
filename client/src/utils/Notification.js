import { Alert } from "@material-ui/lab";

export const showErrorMessage = (message) => {
  return <Alert severity="error">{message}</Alert>;
};

export const showSuccessMessage = (message) => {
  return <Alert severity="success">{message}</Alert>;
};
