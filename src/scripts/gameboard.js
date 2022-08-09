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
  newShipStartingy,
  newShipStartingx,
  axis,
  newShipSize
) {
  let validLocation = 0;
  const newShip = new Ship("doesnt matter", newShipSize);
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
    placeShip(shipIndex, startingy, startingx, axis) {
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
      const newGameboard = updateGameboardWithNewShipLocation(
        this.gameboard,
        ship
      );
      this.gameboard = newGameboard;
    },
    receiveAttack(yAxis, xAxis) {
      if (this.gameboard[yAxis][xAxis].boat === null) {
        this.gameboard[yAxis][xAxis].shotHere = true;
        return "miss";
      }
      let boatIndex;
      switch (this.gameboard[yAxis][xAxis].boat) {
        case "carrier":
          boatIndex = 0;
          break;
        case "battleship":
          boatIndex = 1;
          break;
        case "cruiser":
          boatIndex = 2;
          break;
        case "sub":
          boatIndex = 3;
          break;
        case "patrolBoat":
          boatIndex = 4;
          break;
        default:
          boatIndex = "error";
      }
      this.ships[boatIndex].hit(yAxis, xAxis);
      return `${this.gameboard[yAxis][xAxis].boat} was hit!`;
    },
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
