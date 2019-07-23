import { createAction, handleActions } from "redux-actions";
import { fetch, restVerbs, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  tags: {
    byIds: {},
    allIds: []
  },
  modalOpen: false
};

const base = "TAGS/";

export const setTags = createAction(`${base}GET_ALL_TAGS`);
export const postTag = createAction(`${base}POST_TAG`);
export const toggleModal = createAction(`${base}TOGGLE_MODAL`);

export const tagReducers = handleActions(
  {
    [setTags]: (state, { payload }) => {
      const byIds = {};
      const allIds = payload.map(tag => {
        byIds[tag.code] = tag;
        return tag.code;
      });
      return {
        ...state,
        tags: {
          byIds,
          allIds
        }
      };
    },
    [postTag]: (state, { payload }) => ({
      ...state,
      tags: {
        byIds: { ...state.tags.byIds, [payload.code]: payload },
        allIds: [...state.tags.allIds, payload.code]
      }
    }),
    [toggleModal]: state => ({
      ...state,
      modalOpen: !state.modalOpen
    })
  },
  defaultState
);

export const fetchAllTags = () => dispatch => {
  return fetch(`api/v1/tag`)
    .then(({ data }) => dispatch(setTags(data)))
    .catch(err => errorHandler(err));
};

export const postTagAsync = body => dispatch => {
  return fetch(`api/v1/tag`, restVerbs.POST, body)
    .then(({ data }) => dispatch(postTag(data)))
    .catch(err => errorHandler(err));
};
