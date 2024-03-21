import { autoGame, singlePlayerGame } from "./GameManager";
import { Gameboard } from "./Gameboard";

describe("GameBoardManager", () => {
  test("autoGame will run through an entire game until finished", () => {
    const game = autoGame();

    game.play();

    expect(game.status()).toBeTruthy();
  });

  test("autoGame status is null before game is played", () => {
    const game = autoGame();

    expect(game.status()).toBeFalsy();
  });

  describe("singlePlayerGame", () => {
    test("will allow access to the state of both boards", () => {
      const game = singlePlayerGame();

      expect(game.getHumanBoard().length).toBe(10);
      expect(game.getAiBoard().length).toBe(10);
    });

    test("will properly take a player's turn and then make the computer take a turn", () => {
      const game = singlePlayerGame();
      const initialHumanBoard = game.getHumanBoard();

      game.takeTurn(1, 2);

      expect(game.getAiBoard()[1][2]).toBeDefined();

      let differentCellFound = false;

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (initialHumanBoard[i][j] !== game.getHumanBoard()[i][j]) {
            differentCellFound = true;
          }
        }
      }

      expect(differentCellFound).toBeTruthy();
    });
  });
});
