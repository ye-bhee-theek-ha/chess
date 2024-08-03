// constants.js

  export const GameModes = {
    SINGLE_PLAYER_AI: 'SINGLE_PLAYER_AI',
    MULTIPLAYER_LOCAL: 'MULTIPLAYER_LOCAL',
    MULTIPLAYER_ONLINE: 'MULTIPLAYER_ONLINE',
  };
  
  export const PlayerTypes = {
    HUMAN: 'HUMAN',
    AI: 'AI',
  };
  
  export const PieceColors = {
    WHITE: 'w',
    BLACK: 'b',
  };
  
  export const GameStates = {
    NOT_STARTED: 'NOT_STARTED',
    IN_PROGRESS: 'IN_PROGRESS',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
  };
  
  export const OnlineGameStatus = {
    WAITING_FOR_OPPONENT: 'WAITING_FOR_OPPONENT',
    OPPONENT_CONNECTED: 'OPPONENT_CONNECTED',
    OPPONENT_DISCONNECTED: 'OPPONENT_DISCONNECTED',
  };
  