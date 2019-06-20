import { createAction, handleActions } from "redux-actions";
import { fetch, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  user: false
};

const base = "GLOBAL/SECURITY";

export const setUser = createAction(`${base}SET_USER`);

const securityReducer = handleActions(
  {
    [setUser]: (state, { payload }) => ({
      ...state,
      user: payload
    })
  },
  defaultState
);

export const fetchUser = (push) => dispatch => {
  return fetch(`api/v1/user`)
    .then(({ data: { user } }) => {
      dispatch(setUser(user));
      return user;
    })
    .catch(err => errorHandler(err, push));
};

export default securityReducer;
