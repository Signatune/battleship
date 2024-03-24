import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("Gameboard", () => {
  test("should have a 10x10 board", () => {
    const board = Gameboard();

    expect(board.getBoard().length).toBe(10);
    expect(board.getBoard()[0].length).toBe(10);
  });

  describe("getHiddenBoard", () => {
    test("should return the board as the enemy player would see it", () => {
      const board = Gameboard();

      board.populate([Ship(2), Ship(3)]);

      expect(
        board
          .getHiddenBoard()
          .map((row) => !row.some((cell) => typeof cell === "number")),
      ).toBeTruthy();
    });
  });

  describe("placeShip", () => {
    let board;
    let ship;

    beforeEach(() => {
      board = Gameboard();
      ship = Ship(3);
    });

    test("should be able to place ships vertically when given valid placements", () => {
      board.placeShip(ship, 1, 9, "V");

      const state = board.getBoard();

      expect(state[0][9]).toBeUndefined();
      expect(state[1][9]).toBe(1);
      expect(state[2][9]).toBe(1);
      expect(state[3][9]).toBe(1);
      expect(state[4][9]).toBeUndefined();
    });

    test("should be able to place ships horizontally when given valid placements", () => {
      board.placeShip(ship, 1, 6, "H");

      const state = board.getBoard();

      expect(state[1][5]).toBeUndefined();
      expect(state[1][6]).toBe(1);
      expect(state[1][7]).toBe(1);
      expect(state[1][8]).toBe(1);
      expect(state[1][9]).toBeUndefined();
    });

    test("should not place ships in a way that would not be completely on the board", () => {
      board.placeShip(ship, 9, 9, "V");

      expect(board.getBoard()[9][9]).toBeUndefined();
    });

    test("should not place a ship when it would overlap existing ship", () => {
      board.placeShip(ship, 0, 0, "V");
      board.placeShip(ship, 1, 0, "H");

      const state = board.getBoard();

      expect(state[1][1]).toBeUndefined();
      expect(state[1][2]).toBeUndefined();
    });

    test("should be able to place multiple ships", () => {
      board.placeShip(Ship(2), 2, 5, "V");
      board.placeShip(Ship(2), 7, 6, "V");
      board.placeShip(Ship(3), 1, 7, "V");
      board.placeShip(Ship(4), 6, 5, "H");

      expect(board.numShipsAlive()).toBe(4);
    });
  });

  describe("getShipRoster", () => {
    test("should return a copy of the current ship roster", () => {
      const board = Gameboard();
      const shipA = Ship(2);
      const shipB = Ship(3);

      board.populate([shipA, shipB]);

      const roster = board.getShipRoster();
      const copiedShipA = roster[1];
      const copiedShipB = roster[2];

      expect(Object.entries(roster).length).toBe(2);
      expect(copiedShipA === shipA).toBeFalsy();
      expect(copiedShipB === shipB).toBeFalsy();
      expect(copiedShipA).toMatchObject(shipA);
      expect(copiedShipB).toMatchObject(shipB);
    });
  });

  describe("populate", () => {
    let board;
    let ships;

    beforeEach(() => {
      board = Gameboard();
      ships = [Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)];
    });

    test("should add all and only the given ships to the board", () => {
      expect(board.numShipsAlive()).toBe(0);

      board.populate(ships);

      expect(board.numShipsAlive()).toBe(5);
    });
  });

  describe("receiveAttack", () => {
    let board;
    let ship;

    beforeEach(() => {
      board = Gameboard();
      ship = Ship(3);
      board.placeShip(ship, 1, 3, "H");
    });

    test("will mark an occupied space as hit", () => {
      board.receiveAttack(1, 3);

      expect(board.getBoard()[1][3]).toBe("H");
    });

    test("will mark an unocuppied space as a miss", () => {
      board.receiveAttack(2, 4);

      expect(board.getBoard()[2][4]).toBe("M");
    });
  });

  describe("anyShipsAlive", () => {
    let board;
    let shipA;
    let shipB;

    beforeEach(() => {
      board = Gameboard();
      shipA = Ship(3);
      shipB = Ship(3);
      board.placeShip(shipA, 1, 3, "H");
      board.placeShip(shipB, 3, 3, "V");
    });

    test("will return true if there is at least one ship with one hitpoint left", () => {
      board.receiveAttack(1, 3);
      board.receiveAttack(1, 4);
      board.receiveAttack(1, 5);

      board.receiveAttack(3, 3);
      board.receiveAttack(3, 4);

      expect(board.anyShipsAlive()).toBeTruthy();
    });

    test("will return false if there are no ships alive", () => {
      board.receiveAttack(1, 3);
      board.receiveAttack(1, 4);
      board.receiveAttack(1, 5);

      board.receiveAttack(3, 3);
      board.receiveAttack(4, 3);
      board.receiveAttack(5, 3);

      expect(board.anyShipsAlive()).toBeFalsy();
    });

    test("will return false if there are no ships on the board", () => {
      board = Gameboard();

      expect(board.anyShipsAlive()).toBeFalsy();
    });
  });

  describe("numShipsAlive", () => {
    let board;
    let shipA;
    let shipB;
    let shipC;

    beforeEach(() => {
      board = Gameboard();
      shipA = Ship(3);
      shipB = Ship(3);
      shipC = Ship(3);
    });

    test("will return 0 ships before any have been added", () => {
      expect(board.numShipsAlive()).toBe(0);
    });

    test("will count the number of ships alive on the board", () => {
      expect(board.numShipsAlive()).toBe(0);

      board.placeShip(shipA, 0, 0, "H");
      board.placeShip(shipB, 1, 0, "H");
      board.placeShip(shipC, 2, 0, "H");

      expect(board.numShipsAlive()).toBe(3);
    });

    test("will only count ships that are alive", () => {
      expect(board.numShipsAlive()).toBe(0);

      board.placeShip(shipA, 0, 0, "H");
      board.placeShip(shipB, 1, 0, "H");
      board.placeShip(shipC, 2, 0, "H");

      expect(board.numShipsAlive()).toBe(3);

      board.receiveAttack(0, 0);
      board.receiveAttack(0, 1);
      board.receiveAttack(0, 2);

      expect(board.numShipsAlive()).toBe(2);
    });
  });
});
