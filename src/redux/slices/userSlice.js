// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: '',
    avatar: '',
    pastGames: [],
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
    setPastGames(state, action) {
      state.pastGames = action.payload;
    },
  },
});

export const { setUser, setPastGames } = userSlice.actions;
export default userSlice.reducer;
