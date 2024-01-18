import Ship from "./Ship";

describe("Ship", () => {
  test("factory function returns a Ship object with proper public values", () => {
    const testShip = Ship(3);
    expect(testShip).toBeDefined();
    expect(testShip.length).toBeUndefined();
    expect(testShip.getLength()).toBe(3);
    expect(testShip.getHits()).toBe(0);
  });

  test("hit should increment the number of hits", () => {
    const testShip = Ship(3);

    expect(testShip.getHits()).toBe(0);
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
    testShip.hit();
    expect(testShip.getHits()).toBe(2);
  });

  test("should have a sunk method which indicates when ship is hit enough to be sunk", () => {
    const testShip = Ship(3);

    expect(testShip.isSunk()).toBeFalsy();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
