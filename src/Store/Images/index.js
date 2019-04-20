import { createAction, handleActions } from "redux-actions";
import { fetch } from "../../Shared/Utility/fetch";

const defaultState = {
  images: []
};

const base = "IMAGE/IMAGES";

export const setImages = createAction(`${base}SET_IMAGES`);

export const imageReducers = handleActions(
  {
    [setImages]: (state, { payload }) => ({
      ...state,
      images: payload
    })
  },
  defaultState
);

export const fetchAllImages = (page = 1) => dispatch => {
  return fetch(`api/v1/image?page=${page}`)
    .then(({ data }) => dispatch(setImages(data)))
    .catch(err => console.log(err));
};
