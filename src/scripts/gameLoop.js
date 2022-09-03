import {
  allEventListeners,
  createStartGamePage,
  reRenderBothBoards,
  addRematchButton,
} from "./domStuff";
import { randomShipPlacer } from "./placeShips";
import { Player } from "./player";

const HelperFunctions = {
  createPlayers(player1Name, player2Name) {
    const player1 = new Player(player1Name, "human");
    const player2 = new Player(player2Name, "computer");
    const players = [player1, player2];
    return players;
  },
};

const GameLoop = {
  players: [],

  // preps for a new game
  newGame() {
    this.players = [];
    createStartGamePage();
  },

  // once you have player name and ship locations start a new game
  startGame() {
    reRenderBothBoards(`Click a cell on the enemy Gameboard to attack!`);
    this.takeTurn(this.players[0]);
  },

  // sets up the players
  setPlayers(player1Name) {
    const newPlayers = HelperFunctions.createPlayers(player1Name, "The Enemy");
    this.players = newPlayers;
    this.players[1].gameboard.ships.forEach((ship) => {
      randomShipPlacer(this.players[1], ship.name);
    });
  },

  // takes the turn of the player listed
  takeTurn(player) {
    if (this.checkForOtherPlayerWin(player) === "no winner") {
      if (player.humanOrComp === "human") {
        allEventListeners.addAttackListener();
      } else {
        const string = player.randomMove(this.players[0]);
        reRenderBothBoards(`The enemy shot and ${string}`);
        this.takeTurn(this.players[0]);
      }
    } else {
      reRenderBothBoards(this.checkForOtherPlayerWin(player));
      addRematchButton();
    }
  },
  // on start of turn, checks to see if this player has lost from the previous players move
  checkForOtherPlayerWin(currentPlayer) {
    if (currentPlayer.gameboard.allSunk() === true) {
      const winner =
        this.players.indexOf(currentPlayer) === 0
          ? this.players[1]
          : this.players[0];
      return `${winner.name} won the game! Would you like a rematch?`;
    }
    return "no winner";
  },
};

export { GameLoop };
