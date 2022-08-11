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

  setPlayers(player1Name) {
    const newPlayers = HelperFunctions.createPlayers(player1Name, "compy");
    this.players = newPlayers;
  },
};

export { GameLoop };
