import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApiSlice";
import userSlice from "../features/auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  user: userSlice,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
export const persietedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persietedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
