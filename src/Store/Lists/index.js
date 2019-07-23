import { createAction, handleActions } from "redux-actions";
import { fetch, restVerbs, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  options: [],
  modalOpen: false
};

const base = "LISTS/";

export const setLists = createAction(`${base}SET_LISTS`);
export const postList = createAction(`${base}POST_LIST`);
export const toggleModal = createAction(`${base}TOGGLE_MODAL`);

export const listReducers = handleActions(
  {
    [setLists]: (state, { payload }) => ({
      ...state,
      options: payload
    }),
    [postList]: (state, { payload }) => ({
      ...state,
      options: [...state.options, payload]
    }),
    [toggleModal]: state => ({
      ...state,
      modalOpen: !state.modalOpen
    })
  },
  defaultState
);

export const getUsersLists = id => dispatch => {
  return fetch(`api/v1/list`)
    .then(({ data }) => dispatch(setLists(data)))
    .catch(err => errorHandler(err));
};

export const postListAsync = body => dispatch => {
  return fetch(`api/v1/list`, restVerbs.POST, body)
    .then(({ data }) => {
      dispatch(postList(data));
    })
    .catch(err => errorHandler(err));
};

export const addImageToList = body => () => {
  return fetch(`api/v1/list`, restVerbs.PUT, body).catch(err =>
    errorHandler(err)
  );
};
