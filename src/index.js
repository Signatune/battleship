import "./styles.css";
import { singlePlayerGame } from "./GameManager";

const enemyBoard = document.querySelector(".enemy-board");
const playerBoard = document.querySelector(".player-board");

let game = singlePlayerGame();

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
      } else {
        square.addEventListener("click", () => {
          game.takeTurn(i, j);
          updateBoardDisplay();
        });
      }

      enemyBoard.appendChild(square);
    }
  }
}

updateBoardDisplay();
