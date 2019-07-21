import { createAction, handleActions } from "redux-actions";
import { fetch, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  tags: {
    byIds: {},
    allIds: []
  }
};

const base = "TAGS/";

export const setTags = createAction(`${base}GET_ALL_TAGS`);

export const tagReducers = handleActions(
  {
    [setTags]: (state, { payload }) => {
      const byIds = {};
      const allIds = payload.map(tag => {
        byIds[tag.code] = tag;
        return tag.code
      });
      return {
        ...state,
        tags: {
          byIds,
          allIds
        }
      };
    }
  },
  defaultState
);

export const fetchAllTags = () => dispatch => {
  return fetch(`api/v1/tag`)
    .then(({ data }) => dispatch(setTags(data)))
    .catch(err => errorHandler(err));
};
