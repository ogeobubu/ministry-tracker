import { combineReducers } from "redux";
import auth from "./authReducer";
import users from "./users";
import posts from "./posts";

export default combineReducers({
  auth,
  users,
  posts,
});
