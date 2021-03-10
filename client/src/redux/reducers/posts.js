import ACTIONS from "../actions/";

const posts = [];

const postsReducer = (state = posts, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
};

export default postsReducer;