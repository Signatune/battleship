function generateRandomMove(attackedSpaces) {
  let potentialYCoord = Math.floor(Math.random() * 9);
  let potentialXCoord = Math.floor(Math.random() * 9);

  while (attackedSpaces.has([potentialYCoord, potentialXCoord])) {
    let potentialYCoord = Math.floor(Math.random() * 9);
    let potentialXCoord = Math.floor(Math.random() * 9);
  }

  return [potentialYCoord, potentialXCoord];
}

function aiPlayer(enemyBoard) {
  const attackedSpaces = new Set();

  function takeTurn() {
    const attackCoords = generateRandomMove(attackedSpaces);

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

export { aiPlayer, Player };
