function Gameboard() {
  const boardSize = 10;

  const board = new Array(boardSize);
  let shipRoster = {};
  let nextShipId = 1;

  for (let i = 0; i < 10; i++) {
    board[i] = new Array(boardSize);
  }

  function getBoard() {
    return board.map((row) => [...row]);
  }

  function getHiddenBoard() {
    return board
      .map((row) => row)
      .map((cell) => (typeof cell === "number" ? null : cell));
  }

  function placementValid(ship, y, x, orientation) {
    let length = ship.getLength();

    if (orientation === "V") {
      if (y + length >= boardSize) return false;
      for (let i = y; i <= y + length; i++) {
        if (board[i][x]) return false;
      }
    } else if (orientation === "H") {
      if (x + length >= boardSize) return false;
      for (let i = x; i <= x + length; i++) {
        if (board[y][i]) return false;
      }
    }

    return true;
  }

  function placeShip(ship, y, x, orientation) {
    if (placementValid(ship, y, x, orientation)) {
      shipRoster = {
        ...shipRoster,
        [nextShipId]: ship,
      };

      const shipLength = ship.getLength();

      if (orientation === "V") {
        for (let i = y; i < y + shipLength; i++) {
          board[i][x] = nextShipId;
        }
      } else if (orientation === "H") {
        for (let i = x; i < x + shipLength; i++) {
          board[y][i] = nextShipId;
        }
      }

      nextShipId += 1;
    }
  }

  function populate(ships) {
    for (const ship of ships) {
      let numShipsBefore = numShipsAlive();

      while (numShipsBefore === numShipsAlive()) {
        const potentialYCoord = Math.floor(Math.random() * 9);
        const potentialXCoord = Math.floor(Math.random() * 9);
        const potentialOrientation = Math.random() > 0.5 ? "V" : "H";

        placeShip(ship, potentialYCoord, potentialXCoord, potentialOrientation);
      }
    }
  }

  function receiveAttack(y, x) {
    const targetCell = board[y][x];

    if (typeof targetCell === "number") {
      shipRoster[targetCell].hit();
      board[y][x] = "H";
    } else if (!targetCell) {
      board[y][x] = "M";
    }
  }

  function anyShipsAlive() {
    return Object.entries(shipRoster)
      .map((entry) => entry[1])
      .some((ship) => !ship.isSunk());
  }

  function numShipsAlive() {
    return Object.entries(shipRoster)
      .map((entry) => entry[1])
      .reduce((acc, ship) => acc + (ship.isSunk() ? 0 : 1), 0);
  }

  return {
    getBoard,
    getHiddenBoard,
    placeShip,
    populate,
    receiveAttack,
    anyShipsAlive,
    numShipsAlive,
  };
}

export default Gameboard;
