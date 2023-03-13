import UserActionsTypes from "./action-types";

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  if (action.type === UserActionsTypes.LOGIN) {
    return { ...state, currentUser: action.payload };
  }

  if (action.type === UserActionsTypes.LOGOUT) {
    return { ...state, currentUser: null };
  }
  return state;
};

export default userReducer;
