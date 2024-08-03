// gameService.js
import { ref, set, onValue, update } from 'firebase/database';
import { database } from '../firebase';

// Create a new game
export const createGame = async (gameId, initialState) => {
  const gameRef = ref(database, `games/${gameId}`);
  await set(gameRef, initialState);
};

// Join an existing game and listen for updates
export const joinGame = (gameId, callback) => {
  const gameRef = ref(database, `games/${gameId}`);
  onValue(gameRef, (snapshot) => {
    const gameState = snapshot.val();
    callback(gameState);
  });
};

// Update game state
export const updateGame = async (gameId, updatedState) => {
  const gameRef = ref(database, `games/${gameId}`);
  await update(gameRef, updatedState);
};
