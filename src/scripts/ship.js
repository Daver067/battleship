function Ship(name, length) {
  return {
    name,
    length,
    locations: [],
    numHits: 0,

    placeShip(startingCelly, startingCellx, axis) {
      this.locations.push({
        x_axis: startingCellx,
        y_axis: startingCelly,
        hit: false,
        cell: `${startingCelly}-${startingCellx}`,
      });
      function increaseXAxis() {
        for (let i = 1; i < this.length; i++) {
          let newLocation = {
            x_axis: startingCellx + 1 * i,
            y_axis: startingCelly,
            hit: false,
            cell: `${startingCelly}-${startingCellx + 1 * i}`,
          };
          this.locations.push(newLocation);
        }
      }
      function increaseYAxis() {
        for (let i = 1; i < this.length; i++) {
          let newLocation = {
            x_axis: startingCellx,
            y_axis: startingCelly + 1 * i,
            hit: false,
            cell: `${startingCelly + 1 * i}-${startingCellx}`,
          };
          this.locations.push(newLocation);
        }
      }
      const boundincreaseXAxis = increaseXAxis.bind(this);
      const boundincreaseYAxis = increaseYAxis.bind(this);
      axis === "x" ? boundincreaseXAxis() : boundincreaseYAxis();

      return this.locations;
    },

    hit(cellHitY, cellHitX) {
      this.locations.forEach((location) => {
        if (location.x_axis === cellHitX && location.y_axis === cellHitY) {
          location.hit = true;
          this.numHits++;
        }
      });
    },

    isSunk() {
      return this.numHits === this.length;
    },
  };
}

function allBoats() {
  const carrier = new Ship("carrier", "5");
  const battleship = new Ship("battleship", "4");
  const cruiser = new Ship("cruiser", "4");
  const sub = new Ship("sub", "3");
  const patrolBoat = new Ship("patrolBoat", "3");

  const allShips = { carrier, battleship, cruiser, sub, patrolBoat };
  return allShips;
}
let allShips = allBoats();

export { Ship, allShips };
