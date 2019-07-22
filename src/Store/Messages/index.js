import { createAction, handleActions } from "redux-actions";
import { fetch, restVerbs, errorHandler } from "../../Shared/Utility/fetch";

const defaultState = {
  content: []
};

const base = "MESSAGE/";

export const setMessages = createAction(`${base}SET_MESSAGES`);
export const postMessage = createAction(`${base}POST_MESSAGE`);

export const messageReducers = handleActions(
  {
    [setMessages]: (state, { payload }) => ({
      ...state,
      content: payload
    }),
    [postMessage]: (state, { payload }) => ({
      ...state,
      content: [...state.content, payload]
    })
  },
  defaultState
);

export const getMessagesForImage = id => dispatch => {
  return fetch(`api/v1/message?id=${id}`)
    .then(({ data }) => dispatch(setMessages(data)))
    .catch(err => errorHandler(err));
};

export const postMessageAsync = body => dispatch => {
  return fetch(`api/v1/message`, restVerbs.POST, body)
    .then(({ data }) => dispatch(postMessage(data)))
    .catch(err => errorHandler(err));
};
