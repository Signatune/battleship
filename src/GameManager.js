import { AIPlayer, Player } from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";

// function singlePlayerGame() {
//   let humanBoard = Gameboard();
//   let AIBoard = Gameboard();

//   let humanPlayer = Player(humanBoard);
//   let AIPlayer = AIPlayer(cpuBoard);

//   return {};
// }

function autoGame() {
  let boardOne = Gameboard();
  let boardTwo = Gameboard();

  let playerOne = AIPlayer(boardTwo);
  let playerTwo = AIPlayer(boardOne);

  function play() {
    while (!isGameOver(boardOne, boardTwo)) {
      playerOne.takeTurn();
      playerTwo.takeTurn();
    }
  }

  function status() {
    return determineStatus(boardOne, boardTwo);
  }

  return {
    play,
    status,
  };
}

function isGameOver(boardA, boardB) {
  return !boardA.anyShipsAlive() || !boardB.anyShipsAlive();
}

function determineStatus(boardA, boardB) {
  if (!boardA.anyShipsAlive()) {
    return "B";
  } else if (!boardB.anyShipsAlive()) {
    return "A";
  } else {
    return null;
  }
}

export { autoGame };
