import { createStartGamePage } from "./domStuff";
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
  turnCounter: 0,
  playersTurn: 0,
  newGame() {
    this.players = [];
    this.turnCounter = 0;
    this.playersTurn = 0;
    createStartGamePage();
  },

  setPlayers(player1Name) {
    const newPlayers = HelperFunctions.createPlayers(player1Name, "The Enemy");
    this.players = newPlayers;
  },
  takeTurn() {},
};

export { GameLoop };
