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

function singlePlayerGame(settings) {
  const humanBoard = Gameboard();
  const aiBoard = Gameboard();
  let winner = null;
  let isSetupComplete = false;

  const ships = settings && settings.ships ? settings.ships : [2, 2, 3, 4, 5];

  aiBoard.populate(ships.map((length) => Ship(length)));

  if (!settings || !settings.manualPlacement) {
    humanBoard.populate([Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)]);
    isSetupComplete = true;
  }

  function placeShip(y, x, orientation) {
    if (!isSetupComplete) {
      humanBoard.placeShip(
        Ship(ships[humanBoard.numShipsAlive()]),
        y,
        x,
        orientation,
      );

      isSetupComplete = humanBoard.numShipsAlive() === ships.length;
    }
  }

  const humanPlayer = Player(aiBoard);
  const ai = aiPlayer(humanBoard);

  function getHumanBoard() {
    return humanBoard.getBoard();
  }

  function getHumanShipsAlive() {
    return humanBoard.numShipsAlive();
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
    if (!winner && isSetupComplete) {
      humanPlayer.takeTurn(y, x);
      ai.takeTurn();
    }

    winner = determineStatus(humanBoard, aiBoard);
  }

  return {
    getHumanBoard,
    getHumanShipsAlive,
    getHumanRoster,
    getAiBoard,
    getAiRoster,
    placeShip,
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
