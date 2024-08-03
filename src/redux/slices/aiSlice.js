// slices/aiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    status: 'idle', // 'calculating', 'move decided'
  },
  reducers: {
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    setAIStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setDifficulty, setAIStatus } = aiSlice.actions;
export default aiSlice.reducer;
