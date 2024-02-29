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

  const standardShips = [Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)];

  boardOne.populate([...standardShips]);
  boardTwo.populate([...standardShips]);

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
