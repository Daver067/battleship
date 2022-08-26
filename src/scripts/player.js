import { Gameboard } from "./gameboard";

function Player(name, humanOrComp) {
  return {
    humanOrComp,
    name,
    isActivePlayer: false,
    gameboard: new Gameboard(name),
    // takes the oponent, and attacks their gameboard with 2 co-odinates
    attack(enemy, attackYAxis, attackXaxis) {
      enemy.gameboard.receiveAttack(attackYAxis, attackXaxis);
    },

    // just for computers, takes a list of available moves and atacks it randomly
    randomMove(enemy) {
      const availableMoves = [];
      enemy.gameboard.gameboard.forEach((row) => {
        row.forEach((cell) => {
          if (cell.shotHere === false) {
            availableMoves.push(cell);
          }
        });
      });
      const randomNum = Math.floor(Math.random() * availableMoves.length);
      const thisMove = availableMoves[randomNum];

      const yValue = thisMove.cell[0];
      const xValue = thisMove.cell[2];
      this.attack(enemy, yValue, xValue);
    },
  };
}

export { Player };
