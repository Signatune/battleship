function Ship(length) {
  let hits = 0;

  function getLength() {
    return length;
  }

  function getHits() {
    return hits;
  }

  function hit() {
    hits += 1;
  }

  function isSunk() {
    return hits >= length;
  }

  return {
    getLength,
    getHits,
    hit,
    isSunk,
  };
}

export default Ship;
