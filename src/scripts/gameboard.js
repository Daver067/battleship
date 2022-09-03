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

// checks the input for ship type and changes it to the proper index number
function getShipIndex(shipName) {
  let shipIndex;
  switch (shipName) {
    case "carrier":
      shipIndex = 0;
      break;
    case "battleship":
      shipIndex = 1;
      break;
    case "cruiser":
      shipIndex = 2;
      break;
    case "sub":
      shipIndex = 3;
      break;
    case "patrolBoat":
      shipIndex = 4;
      break;
    default:
      console.log("invalid boat name");
  }
  return shipIndex;
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
  newShipStartingy,
  newShipStartingx,
  axis,
  newShipSize
) {
  let validLocation = 0;
  const newShip = new Ship("theTestBoat", newShipSize);
  newShip.placeShip(newShipStartingy, newShipStartingx, axis);
  currentGameboard.forEach((row) => {
    row.forEach((cell) => {
      newShip.locations.forEach((shipLocation) => {
        if (shipLocation.cell === cell.cell && cell.boat === null) {
          validLocation++;
        }
      });
    });
  });
  if (validLocation !== newShipSize) {
    return "error";
  }
}

// the main Gameboard object
function Gameboard(owner) {
  return {
    owner,
    gameboard: buildGameboard(),
    ships: [
      new Ship("carrier", 5),
      new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("sub", 3),
      new Ship("patrolBoat", 2),
    ],

    // takes the name of the ship, 2 co-ordinates, and an axis and places ship there
    // updates the gameboard and the ships locations with new location
    placeShip(shipName, startingy, startingx, axis) {
      const shipIndex = getShipIndex(shipName);
      if (
        checkValidShipLocation(
          this.gameboard,
          startingy,
          startingx,
          axis,
          this.ships[shipIndex].length
        ) === "error"
      ) {
        return "error";
      }

      const ship = this.ships[shipIndex];
      ship.placeShip(startingy, startingx, axis);
      this.gameboard = updateGameboardWithNewShipLocation(this.gameboard, ship);
    },

    // takes 2 co-ordinates and updates gameboard with miss or hit
    receiveAttack(yAxis, xAxis) {
      this.gameboard[yAxis][xAxis].shotHere = true;
      if (this.gameboard[yAxis][xAxis].boat === null) {
        return "missed!";
      }
      const boatIndex = getShipIndex(this.gameboard[yAxis][xAxis].boat);
      this.ships[boatIndex].hit(yAxis, xAxis);
      return `hit a ${this.gameboard[yAxis][xAxis].boat}`;
    },

    // checks all ships on this gameboard whether they are sunk or not.
    allSunk() {
      let numberSunk = 0;
      this.ships.forEach((ship) => {
        if (ship.isSunk()) {
          numberSunk++;
        }
      });
      return numberSunk === 5;
    },
  };
}
export { Gameboard };
