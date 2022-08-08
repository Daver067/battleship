import { Ship } from "./ship";

function buildGameboard() {
  const gameboard = [];
  for (let i = 0; i < 7; i++) {
    const boardRow = [];
    for (let j = 0; j < 7; j++) {
      const thisBoardCell = { boat: null, shotHere: false, cell: `${i}-${j}` };
      boardRow.push(thisBoardCell);
    }
    gameboard.push(boardRow);
  }
  return gameboard;
}

function updateGameboardWithNewShipLocation(thisGameboard, ship) {
  let returnGameboard = thisGameboard;
  ship.locations.forEach((location) => {
    returnGameboard[location.y_axis][location.x_axis].boat = `${ship.name}`;
  });
  return returnGameboard;
}

function Gameboard(owner) {
  return {
    owner,
    gameboard: buildGameboard(),

    placeShip(shipname, shipSize, startingx, startingy, axis) {
      const ship = new Ship(shipname, shipSize);
      ship.placeShip(startingx, startingy, axis);
      const newGameboard = updateGameboardWithNewShipLocation(
        this.gameboard,
        ship
      );
      this.gameboard = newGameboard;
    },
  };
}
export { Gameboard };
