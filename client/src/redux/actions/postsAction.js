import ACTIONS from "./index";
import axios from "axios";

export const fetchAllPosts = async (token) => {
  const res = await axios.get("/api/post/all_info", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllPosts = (res) => {
  return {
    type: ACTIONS.GET_ALL_POSTS,
    payload: res.data,
  };
};
