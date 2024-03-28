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

    test("will allow the human player to manually place five set ships before gameplay starts when manualPlacement is true", () => {
      const game = singlePlayerGame({ manualPlacement: true });

      game.placeShip(1, 2, "V");
      game.placeShip(5, 5, "H");
      game.placeShip(6, 2, "H");
      game.placeShip(7, 2, "H");
      game.placeShip(8, 2, "H");

      expect(game.getHumanShipsAlive()).toBe(5);
    });

    test("will not allow human player to place more than the set number of ships", () => {
      const game = singlePlayerGame({ manualPlacement: true });

      game.placeShip(1, 2, "V");
      game.placeShip(5, 5, "H");
      game.placeShip(6, 2, "H");
      game.placeShip(7, 2, "H");
      game.placeShip(8, 2, "H");
      game.placeShip(9, 2, "H");

      expect(game.getHumanShipsAlive()).toBe(5);
    });

    test("will not allow human player to take a turn until the set number of ships have been placed", () => {
      const game = singlePlayerGame({ manualPlacement: true });

      game.takeTurn(1, 2);

      expect(game.getAiBoard()[1][2]).not.toBe("H");
      expect(game.getAiBoard()[1][2]).not.toBe("M");
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
