import "./styles.css";
import { singlePlayerGame } from "./GameManager";

const enemyBoard = document.querySelector(".enemy-board");
const playerBoard = document.querySelector(".player-board");
const enemyRoster = document.querySelector(".enemy-area > .roster");
const playerRoster = document.querySelector(".player-area > .roster");

const game = singlePlayerGame();

function updatePlayerRoster() {
  playerRoster.replaceChildren(
    ...Object.entries(game.getAiRoster())
      .map((entry) => entry[1])
      .map((ship) => {
        const shipEl = document.createElement("p");

        shipEl.textContent = `${ship.getLength()}`;

        if (ship.isSunk()) {
          shipEl.classList.add("sunk");
        }

        return shipEl;
      }),
  );
}

function updateEnemyRoster() {
  enemyRoster.replaceChildren(
    ...Object.entries(game.getHumanRoster())
      .map((entry) => entry[1])
      .map((ship) => {
        const shipEl = document.createElement("p");

        shipEl.textContent = `${ship.getLength()}`;

        return shipEl;
      }),
  );
}

function updateWinner() {
  const winnerDisplay = document.querySelector(".winner");

  const winner = game.determineStatus();

  winnerDisplay.textContent = winner ? winner : "None";
}

function updateBoardDisplay() {
  enemyBoard.replaceChildren();
  playerBoard.replaceChildren();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("button");
      const space = game.getHumanBoard()[i][j];

      if (typeof space === "number") {
        square.classList.add("ship");
        square.textContent = space;
      } else if (space === "H") {
        square.classList.add("hit");
      } else if (space === "M") {
        square.classList.add("miss");
      }

      playerBoard.appendChild(square);
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const space = game.getAiBoard()[i][j];
      const square = document.createElement("button");

      if (space === "H") {
        square.classList.add("hit");
      } else if (space === "M") {
        square.classList.add("miss");
      } else if (!game.isGameOver()) {
        square.addEventListener("click", () => {
          game.takeTurn(i, j);
          updateBoardDisplay();
        });
      }

      enemyBoard.appendChild(square);
    }
  }

  updatePlayerRoster();
  updateEnemyRoster();
  updateWinner();
}

updateBoardDisplay();
