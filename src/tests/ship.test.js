import { Ship } from "../scripts/ship";

// making a ship works
test("trying to build a carrier", () => {
  const newShip = new Ship("carrier", 5);
  expect(newShip.name).toBe("carrier");
  expect(newShip.length).toBe(5);
});

// test to see if placing a ship makes the proper locations in the ship
test("placing a ship at 23 down shows that in the location", () => {
  let newShip = new Ship("cruiser", 3);
  newShip.placeShip(2, 3, "y");
  const expected = [
    {
      x_axis: 3,
      y_axis: 2,
      hit: false,
      cell: "2-3",
    },
    {
      x_axis: 3,
      y_axis: 3,
      hit: false,
      cell: "3-3",
    },
    {
      x_axis: 3,
      y_axis: 4,
      hit: false,
      cell: "4-3",
    },
  ];
  expect(newShip.locations).toEqual(expect.arrayContaining(expected));
});

// test to see if entering co-ordinates in the hit function will ensure the proper part of the boat is hit
test("a boat from 11 - 15 is hit at 13, the middle location should be hit", () => {
  const newShip = new Ship("carrier", 5);
  newShip.placeShip(1, 1, "x");
  newShip.hit(1, 3);
  const expected = [
    {
      x_axis: 1,
      y_axis: 1,
      hit: false,
      cell: "1-1",
    },
    {
      x_axis: 2,
      y_axis: 1,
      hit: false,
      cell: "1-2",
    },
    {
      x_axis: 3,
      y_axis: 1,
      hit: true,
      cell: "1-3",
    },
    {
      x_axis: 4,
      y_axis: 1,
      hit: false,
      cell: "1-4",
    },
    {
      x_axis: 5,
      y_axis: 1,
      hit: false,
      cell: "1-5",
    },
  ];
  expect(newShip.locations).toEqual(expect.arrayContaining(expected));
  expect(newShip.numHits).toBe(1);
});

// tests to see if a ship can be sunk
test("if a ship has been hit as many times as it has locations it returns sunk", () => {
  const newShip = new Ship("battleship", 4);
  newShip.placeShip(3, 3, "y");
  newShip.hit(3, 3);
  newShip.hit(4, 3);
  newShip.hit(5, 3);
  newShip.hit(6, 3);
  expect(newShip.isSunk()).toBeTruthy();
});

// tests to see if a ship isn't autoSunk
test("if a ship has been hit as many times as it has locations it returns sunk", () => {
  const newShip = new Ship("battleship", 4);
  newShip.placeShip(3, 4, "y");
  expect(newShip.isSunk()).toBeFalsy();
});
