import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducers from "./Global";
import { imageReducers } from "./Images";
import { tagReducers } from "./Tags";
import { messageReducers } from "./Messages";
import { listReducers } from "./Lists";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  global: globalReducers,
  images: imageReducers,
  tags: tagReducers,
  messages: messageReducers,
  lists: listReducers,
  router: connectRouter(history)
});

export const store = createStore(
  rootReducer, // top parent
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    )
  )
);
