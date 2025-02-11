// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { profileApi } from '../services/profileApi';
import { groupsApi } from './../services/groupsApi';
import { homeSlice } from '../features/Home/HomeSlice';
import { userLoginApi } from '../services/userLoginApi';
import { userAuthApi } from '../services/userAuthApi';
import { hadithApi } from '../services/hadithApi';
import { postApi } from './../services/postApi';
import { loveApi } from '../services/loveApi';
import { unlikeApi } from '../services/unlikeApi';
import { friendsApi } from '../services/friendsApi';



// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // Add reducers here when needed, e.g., ['auth']
};

// Combine reducers
const rootReducer = combineReducers({
  home: homeSlice.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [userLoginApi.reducerPath]: userLoginApi.reducer,
  [userAuthApi.reducerPath]: userAuthApi.reducer,
  [hadithApi.reducerPath]: hadithApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [loveApi.reducerPath]: loveApi.reducer,
  [unlikeApi.reducerPath]: unlikeApi.reducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  // Add more reducers as needed
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // (Optional) Disable SerializableStateInvariantMiddleware if needed
    }).concat(
      profileApi.middleware,
      groupsApi.middleware,
      userLoginApi.middleware,
      userAuthApi.middleware,
      hadithApi.middleware,
      postApi.middleware,
      loveApi.middleware,
      unlikeApi.middleware,
      friendsApi.middleware,
      // Add other middlewares as needed
    ),
});

// Persistor for managing persisted state
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;