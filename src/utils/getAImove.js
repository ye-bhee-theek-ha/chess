import axios from 'axios';

/**
 * Sends a request to the Flask backend to get the AI move.
 * @param {string} fen - The current board position in FEN format.
 * @param {number} difficulty - The depth for the Minimax algorithm.
 * @returns {Promise<string>} The best move in UCI format.
 */

export async function getAImove(fen, difficulty = 2) {
    try {
        const response = await axios.post('http://127.0.0.1:5000/next_move', {
            fen: fen,
            depth: difficulty,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching AI move:', error);
        throw error;
    }
}
