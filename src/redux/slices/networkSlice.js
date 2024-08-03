// slices/networkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    status: 'disconnected', // 'connecting', 'connected', 'disconnected'
    opponentStatus: 'disconnected', // 'connecting', 'connected', 'disconnected'
    latency: null,
  },
  reducers: {
    setConnectionStatus(state, action) {
      state.status = action.payload;
    },
    setOpponentStatus(state, action) {
      state.opponentStatus = action.payload;
    },
    setLatency(state, action) {
      state.latency = action.payload;
    },
  },
});

export const { setConnectionStatus, setOpponentStatus, setLatency } = networkSlice.actions;
export default networkSlice.reducer;
