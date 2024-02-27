import Gameboard from "./Gameboard";
import * as Player from "./Player";

describe("AIPlayer", () => {
  describe("takeTurn", () => {
    let aiPlayer;
    let boardMock = {};

    beforeEach(() => {
      boardMock.receiveAttack = jest.fn(() => {});
      aiPlayer = Player.AIPlayer(boardMock);
    });

    test("will attack random coordinates on enemy board", () => {
      aiPlayer.takeTurn();

      expect(boardMock.receiveAttack).toBeCalled();
    });
  });
});
