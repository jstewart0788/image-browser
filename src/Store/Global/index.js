import { combineReducers } from "redux";
import loadingReducer from "./loading";
import securityReducer from "./security";

const globalReducers = combineReducers({
  loading: loadingReducer,
  security: securityReducer
});

export default globalReducers;