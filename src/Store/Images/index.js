import { createAction, handleActions } from "redux-actions";
import { fetch } from "../../Shared/Utility/fetch";

const defaultState = {
  selectedImage: null,
  images: []
};

const base = "IMAGE/IMAGES";

export const setImages = createAction(`${base}SET_IMAGES`);
export const selectImage = createAction(`${base}SELECT_IMAGE`);

export const imageReducers = handleActions(
  {
    [setImages]: (state, { payload }) => ({
      ...state,
      images: payload
    }),
    [selectImage]: (state, { payload }) => ({
      ...state,
      selectedImage: payload
    })
  },
  defaultState
);

export const fetchAllImages = (page = 1) => dispatch => {
  return fetch(`api/v1/image?page=${page}`)
    .then(({ data }) => dispatch(setImages(data)))
    .catch(err => console.log(err));
};
