import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApiSlice";
import { userApi } from "../features/user/api/userApiSlice";
import userSlice from "../features/auth/userSlice";
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
import { postsApiSlice } from "../features/posts/api/postsApiSlice";
import { commentApiSlice } from "../features/comments/api/commentApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [postsApiSlice.reducerPath]: postsApiSlice.reducer,
  [commentApiSlice.reducerPath]: commentApiSlice.reducer,
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
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(postsApiSlice.middleware)
      .concat(commentApiSlice.middleware),
});

export const persistor = persistStore(store);
