import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../../utils/Validation";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../utils/Notification";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { useStyles } from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: "",
};

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const {
    firstName,
    lastName,
    password,
    confirmPassword,
    error,
    success,
  } = data;

  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("firstLogin");
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const updateInfo = () => {
    const token = localStorage.getItem("firstLogin");
    try {
      axios.patch(
        "/api/users/update",
        {
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, error: "", success: "Updated Successfully!" });
    } catch (error) {
      setData({ ...data, error: error.response.data.message, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, confirmPassword))
      return setData({
        ...data,
        error: "Password did not match.",
        success: "",
      });

    // try {
    //   const token = localStorage.getItem("firstLogin");
    //   axios.post(
    //     "/api/users/reset",
    //     { password },
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );

    //   setData({ ...data, error: "", success: "Updated Successfully!" });
    // } catch (err) {
    //   setData({ ...data, error: error.response.data.message, success: "" });
    // }
  };

  const handleUpdate = () => {
    if (firstName) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("firstLogin");
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/api/users/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, error: error.response.data.message, success: "" });
    }
  };

  return (
    <div>
      {error && showErrorMessage(error)}
      {success && showSuccessMessage(success)}
      {loading && <h3>Loading.....</h3>}

      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title={isAdmin ? "Admin Profile" : "Profile"}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  label={user.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={`0${user.number}`}
                  variant="outlined"
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="password"
                  onChange={handleChange}
                  required
                  value={password}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  value={confirmPassword}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label={user.role}
                  name="role"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid> */}
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              onClick={handleUpdate}
              disabled={loading}
              variant="contained"
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>

      <Divider />
      <Grid item md={12} xs={12}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardHeader title={isAdmin ? "Users" : "My Orders"} />
          <Divider />

          <Box minWidth={500}>
            <div style={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "admin" ? (
                          <i className="fa fa-check" title="Admin"></i>
                        ) : (
                          <i className="fa fa-times" title="User"></i>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/edit_user/${user._id}`}>
                          <i className="fa fa-edit" title="Edit"></i>
                        </Link>
                        <i
                          className="fa fa-trash"
                          title="Remove"
                          onClick={() => handleDelete(user._id)}
                        ></i>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Box>
        </Card>
      </Grid>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
