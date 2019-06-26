import { createAction, handleActions } from "redux-actions";
import { fetch, errorHandler, restVerbs } from "../../Shared/Utility/fetch";

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

export const fetchUser = push => dispatch => {
  return fetch(`api/v1/user`)
    .then(({ data }) => {
      dispatch(setUser(data));
      return data;
    })
    .catch(err => errorHandler(err, push));
};

export const login = (values, push) => dispatch => {
  return fetch(`api/v1/user/login`, restVerbs.POST, values)
    .then(({ data }) => {
      dispatch(setUser(data));
      push('/');
      return data;
    })
    .catch(err => errorHandler(err));
};

export const createUser = values => dispatch => {
  return fetch(`api/v1/user`, restVerbs.POST, values)
    .catch(err => errorHandler(err));
};

export default securityReducer;
