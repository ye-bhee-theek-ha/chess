// slices/appSettingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
    sound: true,
    notifications: true,
    language: 'en',
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setSound(state, action) {
      state.sound = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setSound, setNotifications, setLanguage } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
