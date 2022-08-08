import { Gameboard } from "../scripts/gameboard";

// builds a gameboard from 11 to 77
test("builds an empty gameboard", () => {
  const newGameboard = new Gameboard("daver");
  const expected = [
    [
      { boat: null, shotHere: false, cell: "0-0" },
      { boat: null, shotHere: false, cell: "0-1" },
      { boat: null, shotHere: false, cell: "0-2" },
      { boat: null, shotHere: false, cell: "0-3" },
      { boat: null, shotHere: false, cell: "0-4" },
      { boat: null, shotHere: false, cell: "0-5" },
      { boat: null, shotHere: false, cell: "0-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "1-0" },
      { boat: null, shotHere: false, cell: "1-1" },
      { boat: null, shotHere: false, cell: "1-2" },
      { boat: null, shotHere: false, cell: "1-3" },
      { boat: null, shotHere: false, cell: "1-4" },
      { boat: null, shotHere: false, cell: "1-5" },
      { boat: null, shotHere: false, cell: "1-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "2-0" },
      { boat: null, shotHere: false, cell: "2-1" },
      { boat: null, shotHere: false, cell: "2-2" },
      { boat: null, shotHere: false, cell: "2-3" },
      { boat: null, shotHere: false, cell: "2-4" },
      { boat: null, shotHere: false, cell: "2-5" },
      { boat: null, shotHere: false, cell: "2-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "3-0" },
      { boat: null, shotHere: false, cell: "3-1" },
      { boat: null, shotHere: false, cell: "3-2" },
      { boat: null, shotHere: false, cell: "3-3" },
      { boat: null, shotHere: false, cell: "3-4" },
      { boat: null, shotHere: false, cell: "3-5" },
      { boat: null, shotHere: false, cell: "3-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "4-0" },
      { boat: null, shotHere: false, cell: "4-1" },
      { boat: null, shotHere: false, cell: "4-2" },
      { boat: null, shotHere: false, cell: "4-3" },
      { boat: null, shotHere: false, cell: "4-4" },
      { boat: null, shotHere: false, cell: "4-5" },
      { boat: null, shotHere: false, cell: "4-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "5-0" },
      { boat: null, shotHere: false, cell: "5-1" },
      { boat: null, shotHere: false, cell: "5-2" },
      { boat: null, shotHere: false, cell: "5-3" },
      { boat: null, shotHere: false, cell: "5-4" },
      { boat: null, shotHere: false, cell: "5-5" },
      { boat: null, shotHere: false, cell: "5-6" },
    ],
    [
      { boat: null, shotHere: false, cell: "6-0" },
      { boat: null, shotHere: false, cell: "6-1" },
      { boat: null, shotHere: false, cell: "6-2" },
      { boat: null, shotHere: false, cell: "6-3" },
      { boat: null, shotHere: false, cell: "6-4" },
      { boat: null, shotHere: false, cell: "6-5" },
      { boat: null, shotHere: false, cell: "6-6" },
    ],
  ];
  expect(newGameboard.gameboard).toEqual(expect.arrayContaining(expected));
});

// place ship will return the gameboard updated with the ship location
test("placing a ship will update the gameboard with ships location", () => {
  const newGameboard = new Gameboard("daver");
  newGameboard.placeShip("cruiser", 3, 0, 0, "x");
  const expected = [
    { boat: "cruiser", shotHere: false, cell: "0-0" },
    { boat: "cruiser", shotHere: false, cell: "0-1" },
    { boat: "cruiser", shotHere: false, cell: "0-2" },
    { boat: null, shotHere: false, cell: "0-3" },
    { boat: null, shotHere: false, cell: "0-4" },
    { boat: null, shotHere: false, cell: "0-5" },
    { boat: null, shotHere: false, cell: "0-6" },
  ];
  expect(newGameboard.gameboard[0]).toEqual(expect.arrayContaining(expected));
});

// place ship will throw an error if the ship is placed out of bounds

// place ship will throw an error if the ship is placed on top of another ship

// recieve attack will properly identify a miss

// recieve attack will determine a hit

// allSunk will return false if all aren't sunk

// allSunk will return true when all are sunk
