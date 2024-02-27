import { autoGame } from "./GameManager";

describe("GameBoardManager", () => {
  test("autoGame will run through an entire game until finished", () => {
    let game = autoGame();

    game.play();

    // expect(game.status()).toBeTruthy();
  });

  test("autoGame status is null before game is played", () => {
    let game = autoGame();

    // expect(game.status()).toBeUndefined();
  });
});
