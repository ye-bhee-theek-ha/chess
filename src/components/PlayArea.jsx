import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { PieceColors } from "constants";
import { setGameState, initializeAI, initializeLocal, startGame, update, endGame, resetGame } from '../redux/slices/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { GameModes } from "constants";
import { getAImove } from "utils/getAImove";


export default function PlayArea() {
  const [game, setGame] = useState();

  const [highlightedSquares, setHighlightedSquares] = useState({});
  const [WaitingForMove, setWaitingForOpponentMove] = useState()

  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);

  //when screen is loaded
  useEffect(() => {
    if (gameState.status === "null") 
    {
      dispatch(initializeAI());
    }

    if (!gameState.game) {
      // Initialize a new game if not set
      const initialGame = new Chess();
      setGame(initialGame);

      // Set up the initial game state in Redux
      dispatch(startGame({
        gameId: Date.now(),
        game: {
          fen: initialGame.fen(),
          moveHistory: [],
        },
      }));

    } else {
      const gameCopy = new Chess(gameState.game.fen);
      try {

        setGame(gameCopy);
        setWaitingForOpponentMove(gameState.PlayerColor !== game.turn())

      } catch (error) {
        console.error(error)
      }
    }
  }, []);


  // when chessboard changes
  useEffect(() => { //also get live opponent move here

    if (gameState.PlayerColor)
    {
      console.log("changing wait")
      setWaitingForOpponentMove(gameState.PlayerColor != game.turn());
    }

    if (gameState.status === "ongoing" && game.turn() !== gameState.PlayerColor) {
      console.log("getaimove")
      AImove()
    }

  }, [game]);

  const AImove = async() => {
    if (game.turn() !== gameState.PlayerColor) {
      setWaitingForOpponentMove(true)
      // edit stop clock here
      // ...
      const AImove = await getAImove(game.fen(), 9)
      makeMove(AImove.move, AImove.new_fen)
      console.log(AImove)
      setWaitingForOpponentMove(false)
    }
  }

  const makeMove = (move, fen="") => {
    const gameCopy = new Chess(game.fen());
    const validMoves = gameCopy.moves({ verbose: true });

    // Check if the move is valid
    let isValidMove = false; 
    // for ai
    if (fen !== "") {
      console.log(validMoves)
      isValidMove = validMoves.some(
        (validMove) => validMove.after === fen
      );
    }
    // for human
    else {
      isValidMove = validMoves.some(
        (validMove) => validMove.from === move.from && validMove.to === move.to
      );
    }

    if (!isValidMove) {
      console.log("Invalid move:", move);
      return null;
    }

    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy);
      setHighlightedSquares({});
    }

    dispatch(update({ game: gameCopy.fen(), moveHistory: gameCopy.history()}));

    console.log("move:")
    console.log(result);

    console.log("game:")
    console.log(game)
    return result;
  };

  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeMove(possibleMoves[randomIndex]);
  };

  const onDrop = (sourceSquare, targetSquare) => {

    if (game.turn() == gameState.PlayerColor || gameState.mode == GameModes.MULTIPLAYER_LOCAL) {
      const move = makeMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      // illegal move
      if (move == null) return false;
      return true;
    }

    return false
  };

  const onMouseOverSquare = (square) => {
      if (game.turn() !== gameState.PlayerColor && gameState.mode !== GameModes.MULTIPLAYER_LOCAL)
    {
      return;
    }

    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const squaresToHighlight = {};
    moves.forEach((move) => {
      squaresToHighlight[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.turn()
            ? 'rgba(255, 105, 97, 0.6)' // Pastel red (light pink) for capture moves
            : 'rgba(173, 216, 230, 0.6)', // Pastel blue for regular moves
        border: '2px solid rgba(255, 228, 196, 0.8)', // Pastel yellow border for all highlighted moves
        borderRadius: '10px', // Rounded corners
      };
    });

    setHighlightedSquares(squaresToHighlight);
  };

  const onMouseOutSquare = () => {
    setHighlightedSquares({});
  };


  return (
    <div className="flex justify-center items-center">
      {game &&
        <>
          <div className="mb-4">
            {game.turn() === "w" ? "White's turn" : "Black's turn"}
            <br />
            {WaitingForMove === true ? "ai is thinking" : ""}
          </div>
          <div className="h-screen w-[100vh]">
            
              <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={onMouseOutSquare}
                customSquareStyles={highlightedSquares}
              />
          </div>
        </>
      }
    </div>
  );
}

