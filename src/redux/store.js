// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appSettingsReducer from './slices/appSettingsSlice';
import gameReducer from './slices/gameSlice';
import networkReducer from './slices/networkSlice';
import aiReducer from './slices/aiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    appSettings: appSettingsReducer,
    game: gameReducer,
    network: networkReducer,
    ai: aiReducer,
  },
});

export default store;
