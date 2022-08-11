import { Gameboard } from "./gameboard";

function Player(name, humanOrComp) {
  return {
    humanOrComp,
    name,
    isActivePlayer: false,
    gameboard: new Gameboard(name),
    attack(enemy, attackYAxis, attackXaxis) {
      enemy.gameboard.receiveAttack(attackYAxis, attackXaxis);
    },
    beginTurn() {
      this.isActivePlayer = true;
    },
    endTurn() {
      this.isActivePlayer = false;
    },
  };
}

export { Player };
