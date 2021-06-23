import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import authReducer from "../authSlice";

export default (history) =>
  combineReducers({
    router: connectRouter(history), // Connects react router to redux
    user,
    auth: authReducer,
  });
