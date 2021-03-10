import ACTIONS from "../actions";

const initialState = {
  isLogged: false,
  isAdmin: false,
  user: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
