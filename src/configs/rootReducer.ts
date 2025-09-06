import moduleReducers from "@modules/main/stores/reducers";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { persistedAuthReducer } from "@share/auth/stores/authSlice";
import { persistedUserReducer } from "@share/auth/stores/userSlice";
import commonReducer from "@share/stores/commonSlice";

const appReducer = combineReducers({
  auth: persistedAuthReducer,
  common: commonReducer,
  user: persistedUserReducer,
  ...moduleReducers,
});

type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: Action) => {
  if (action.type === "authentication/resetAppState") {
    const { auth, common, user } = state || {};

    return appReducer({ auth, common, user } as AppState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
