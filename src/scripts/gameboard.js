import { Ship } from "./ship";

// builds the gameboard inside the gameboard function
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

// during place ship in gameboard this function updates the gameboard with the ship location
function updateGameboardWithNewShipLocation(thisGameboard, ship) {
  let returnGameboard = thisGameboard;
  ship.locations.forEach((location) => {
    returnGameboard[location.y_axis][location.x_axis].boat = `${ship.name}`;
  });
  return returnGameboard;
}

// this function runs through all cells in gameboard and ensures the location the ship is in is a valid location
function checkValidShipLocation(
  currentGameboard,
  newShipStartingx,
  newShipStartingy,
  axis,
  newShipSize
) {
  let validLocation = 0;
  const newShip = new Ship("doesnt matter", newShipSize);
  newShip.placeShip(newShipStartingx, newShipStartingy, axis);
  currentGameboard.forEach((row) => {
    row.forEach((cell) => {
      newShip.locations.forEach((shipLocation) => {
        if (shipLocation.cell === cell.cell && cell.boat === null) {
          validLocation++;
        }
      });
    });
  });
  if (validLocation !== newShip.locations.length) {
    return "error";
  }
}

function Gameboard(owner) {
  return {
    owner,
    gameboard: buildGameboard(),

    placeShip(shipname, shipSize, startingx, startingy, axis) {
      if (
        checkValidShipLocation(
          this.gameboard,
          startingx,
          startingy,
          axis,
          shipSize
        ) === "error"
      ) {
        return "error";
      }

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
