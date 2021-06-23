import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { configureStore } from "@reduxjs/toolkit";

import CreateRootReducer from "./reducers/index";

export default function configuredStore(history, initialState = {}) {
  return configureStore({
    reducer: CreateRootReducer(history),
    devTools: process.env.NODE_ENV !== "production",
    middlewares: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV !== "production") {
        const logger = createLogger({ collapsed: true, diff: true });
        return getDefaultMiddleware().concat([routerMiddleware(history), logger]);
      }
      return getDefaultMiddleware().concat([routerMiddleware(history)]);
    },
    initialState,
  });
}
