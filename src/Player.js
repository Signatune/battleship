// function takeTurnComputer(enemyBoard, attackedSpaces) {
//   let coords = generateRandomMove(attackedSpaces);

//   enemyBoard.receiveAttack(y, x);
// }

function generateRandomMove(attackedSpaces) {
  let potentialYCoord = Math.floor(Math.random() * 10);
  let potentialXCoord = Math.floor(Math.random() * 10);

  while (attackedSpaces.has([potentialYCoord, potentialXCoord])) {
    let potentialYCoord = Math.floor(Math.random() * 10);
    let potentialXCoord = Math.floor(Math.random() * 10);
  }

  return [potentialYCoord, potentialXCoord];
}

function AIPlayer(enemyBoard) {
  let attackedSpaces = new Set();

  function takeTurn() {
    let attackCoords = generateRandomMove(attackedSpaces);

    attackedSpaces.add(attackCoords);

    enemyBoard.receiveAttack(...attackCoords);
  }

  return {
    takeTurn,
  };
}

function Player(enemyBoard) {
  function takeTurn(y, x) {
    enemyBoard.receiveAttack(y, x);
  }

  return {
    takeTurn,
  };
}

export { AIPlayer, Player };
