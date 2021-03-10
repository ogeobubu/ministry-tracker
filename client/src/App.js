import { useEffect } from "react";
import Auth from "./components/Auth/Auth";
import { Switch, Route, useHistory } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Profile from "./components/pages/Profile/Profile";

import { useDispatch, useSelector } from "react-redux";

import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authActions";

import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "./redux/actions/usersAction";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { user, isAdmin } = auth;

  useEffect(() => {
    const token = localStorage.getItem("firstLogin");

    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [isAdmin, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("firstLogin");

    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    } else {
      localStorage.removeItem("firstLogin");
      history.push("/");
    }
  }, [auth.isLogged, dispatch, history]);

  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Route path="/dashboard" exact component={user ? Dashboard : Auth} />
      <Route path="/profile" exact component={user ? Profile : Auth} />
    </Switch>
  );
};

export default App;
