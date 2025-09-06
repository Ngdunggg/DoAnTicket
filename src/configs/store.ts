import rootReducer from "@configs/rootReducer";
import middleware from "@modules/main/stores/middleware";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";

/**
 * Configures the store for the application.
 *
 * @param {Object} options - The options for configuring the store.
 * @param {Function} options.reducer - The reducer function for the store.
 * @param {Function} options.middleware - The middleware function for the store.
 * @returns {Object} - The configured store.
 */
export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
  reducer: rootReducer,
});

/**
 * Creates a persister for the store.
 *
 * @returns The persister object.
 */
export const persister = persistStore(store);

/**
 * Represents the root state type of the store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type definition for the `AppDispatch` variable.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Custom hook for selecting state from the Redux store.
 *
 * @returns The selected state from the store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for dispatching actions to the Redux store.
 *
 * @returns The dispatch function of the store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
