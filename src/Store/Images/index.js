import { createAction, handleActions } from "redux-actions";
import { restVerbs, fetch, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  selectedImage: null,
  images: [],
  count: 0,
  filter: null,
  uploaderOpen: false
};

const base = "IMAGE/IMAGES";

export const setImages = createAction(`${base}SET_IMAGES`);
export const setCount = createAction(`${base}SET_COUNT`);
export const selectImage = createAction(`${base}SELECT_IMAGE`);
export const setFilter = createAction(`${base}SET_FILTER`);
export const setImage = createAction(`${base}SET_FILTER`);
export const updateOne = createAction(`${base}UPDATE_ONE`);
export const toggleUploader = createAction(`${base}TOGGLE_UPLOADER`);

export const imageReducers = handleActions(
  {
    [setImages]: (state, { payload }) => ({
      ...state,
      images: payload
    }),
    [selectImage]: (state, { payload }) => ({
      ...state,
      selectedImage: payload
    }),
    [setCount]: (state, { payload }) => ({
      ...state,
      count: payload
    }),
    [setFilter]: (state, { payload }) => ({
      ...state,
      filter: payload
    }),
    [updateOne]: (state, { payload }) => ({
      ...state,
      selectedImage: payload
    }),
    [toggleUploader]: state => ({
      ...state,
      uploaderOpen: !state.uploaderOpen
    })
  },
  defaultState
);

export const fetchAllImages = (page = 1) => (dispatch, getState) => {
  const {
    images: { filter }
  } = getState();
  return fetch(`api/v1/image?page=${page}${filter ? `&filter=${filter}` : ""}`)
    .then(({ data }) => dispatch(setImages(data)))
    .catch(err => errorHandler(err));
};

export const fetchNumberOfImages = () => (dispatch, getState) => {
  const {
    images: { filter }
  } = getState();
  return fetch(`api/v1/image?count=1${filter ? `&filter=${filter}` : ""}`)
    .then(({ data: { count } }) => dispatch(setCount(count)))
    .catch(err => errorHandler(err));
};

export const updateOneAsync = image => dispatch => {
  return fetch(`api/v1/image`, restVerbs.PUT, { image })
    .then(({ data }) => dispatch(updateOne(data)))
    .catch(err => errorHandler(err));
};

export const uploadMultipleImages = (files, handleCancle) => dispatch => {
  return fetch(`api/v1/image`, restVerbs.POST, files, "multipart/form-data")
    .then(() => {
      handleCancle();
      dispatch(fetchAllImages());
    })
    .catch(err => errorHandler(err));
};
