import { aiPlayer, Player } from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";

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

function singlePlayerGame() {
  const humanBoard = Gameboard();
  const aiBoard = Gameboard();
  let winner = null;

  // const standardShips = [Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)];

  humanBoard.populate([Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)]);
  aiBoard.populate([Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)]);

  const humanPlayer = Player(aiBoard);
  const ai = aiPlayer(humanBoard);

  function getHumanBoard() {
    return humanBoard.getBoard();
  }

  function getHumanRoster() {
    return humanBoard.getShipRoster();
  }

  function getAiBoard() {
    return aiBoard.getBoard();
  }

  function getAiRoster() {
    return aiBoard.getShipRoster();
  }

  function takeTurn(y, x) {
    if (!winner) {
      humanPlayer.takeTurn(y, x);
      ai.takeTurn();
    }

    winner = determineStatus(humanBoard, aiBoard);
  }

  return {
    getHumanBoard,
    getHumanRoster,
    getAiBoard,
    getAiRoster,
    takeTurn,
    isGameOver: () => isGameOver(humanBoard, aiBoard),
    determineStatus: () => determineStatus(humanBoard, aiBoard),
  };
}

function autoGame() {
  let boardOne = Gameboard();
  let boardTwo = Gameboard();

  // const standardShips = [Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)];

  boardOne.populate([Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)]);
  boardTwo.populate([Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)]);

  let playerOne = aiPlayer(boardTwo);
  let playerTwo = aiPlayer(boardOne);

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

export { autoGame, singlePlayerGame };
