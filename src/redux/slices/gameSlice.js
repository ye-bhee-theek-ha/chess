// slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { PieceColors } from 'constants';
import { GameModes } from 'constants';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameId: null,
    game: null,
    mode: null,
    opponent: null,
    PlayerColor: "",
    timeControl: null,
    winner: null,
    status: 'null', // 'idle', 'ongoing', 'paused', 'finished'
  },
  reducers: {
    setGameState(state, action) {
      return { ...state, ...action.payload };
    },
    initializeGame(state, action) {
      const { gameId, mode, opponent, PlayerColor, timeControl } = action.payload;

      state.gameId = gameId !== undefined ? gameId : state.gameId;
      state.mode = mode !== undefined ? mode : state.mode;
      state.PlayerColor = PlayerColor !== undefined ? PlayerColor : state.PlayerColor;

      state.opponent = opponent !== undefined ? opponent : state.opponent;
      state.timeControl = timeControl !== undefined ? timeControl : state.timeControl;
      state.status = 'idle';
    },
   
    initializeAI(state) {
      state.gameId = Date.now();
      state.mode = GameModes.SINGLE_PLAYER_AI;
      state.PlayerColor = PieceColors.WHITE;

      state.timeControl = null; //add later
      state.status = 'idle';
    },
    
    initializeLocal(state) {
      console.log("initilaized as local")
      state.gameId = Date.now();
      state.mode = GameModes.MULTIPLAYER_LOCAL;
      state.PlayerColor = PieceColors.WHITE;

      state.timeControl = null; //add later
      state.status = 'idle';
    },
   
    startGame(state, action) {
      const { game } = action.payload;
      
      state.game = game !== undefined ? game : state.game;
      state.status = 'ongoing';
    },
    update(state, action) {
      state.game = action.payload.game;
    },
    endGame(state) {
      //upload to db
      state.status = 'finished';
    },
    resetGame(state) {
      state.gameId = null;
      state.mode = null;
      state.opponent = null;
      state.timeControl = null;
      state.status = 'idle';
    },
  },
});

export const { setGameState, initializeGame, initializeAI, initializeLocal, startGame, update, endGame, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
