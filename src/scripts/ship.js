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

export { Ship };
