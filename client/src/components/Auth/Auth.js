import { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { isEmpty, isEmail, isLength, isMatch } from "../../utils/Validation";
import { showErrorMessage, showSuccessMessage } from "../../utils/Notification";

import { useDispatch } from "react-redux";
import { dispatchLogin } from "../../redux/actions/authActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    number,
    password,
    confirmPassword,
    error,
    success,
  } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (create) {
      if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
        return setUser({
          ...user,
          error: "Please fill up all fields",
          success: "",
        });
      }

      if (!isEmail(email)) {
        return setUser({
          ...user,
          error: "Invalid email.",
          success: "",
        });
      }

      if (isLength(password)) {
        return setUser({
          ...user,
          error: "Password must be at least 6 characters long.",
          success: "",
        });
      }

      if (!isMatch(password, confirmPassword)) {
        return setUser({
          ...user,
          error: "Password do not match.",
          success: "",
        });
      }

      try {
        const res = await axios.post("/api/users/create", {
          firstName,
          lastName,
          email,
          number,
          password,
        });

        setUser({
          ...user,
          success: res.data.message,
          error: "",
        });
        console.log(user);
      } catch (error) {
        error.response.data.message &&
          setUser({
            ...user,
            error: error.response.data.message,
            success: "",
          });
      }
    } else {
      try {
        const res = await axios.post("/api/users/login", {
          email,
          password,
        });

        setUser({
          ...user,
          error: "",
          success: res.data.message.info,
        });

        localStorage.setItem("firstLogin", res.data.message.token);

        dispatch(dispatchLogin());

        history.push("/dashboard");
      } catch (error) {
        return setUser({
          ...user,
          error: error.response.data.message,
          success: "",
        });
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSwitch = () => {
    setCreate((prevState) => !prevState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {create ? "Create Account" : "Log In"}
        </Typography>
        {error && showErrorMessage(error)}
        {success && showSuccessMessage(success)}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          {create ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="lname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="number"
                  name="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="number"
                  label="Phone Number"
                  value={number}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="confirmPassword"
                  name="confirmPassword"
                  variant="outlined"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleOnChange}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Button onClick={handleSwitch} variant="body2">
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleOnChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleOnChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button onClick={handleSwitch}>
                    Don't have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Auth;
