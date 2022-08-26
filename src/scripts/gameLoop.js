import {
  allEventListeners,
  createStartGamePage,
  reRenderBothBoards,
} from "./domStuff";
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
    reRenderBothBoards();
    this.takeTurn(this.players[0]);
  },

  // sets up the players
  setPlayers(player1Name) {
    const newPlayers = HelperFunctions.createPlayers(player1Name, "The Enemy");
    this.players = newPlayers;
    this.players[1].gameboard.placeShip("carrier", 0, 0, "x");
    this.players[1].gameboard.placeShip("battleship", 1, 0, "x");
    this.players[1].gameboard.placeShip("cruiser", 2, 0, "x");
    this.players[1].gameboard.placeShip("sub", 3, 0, "x");
    this.players[1].gameboard.placeShip("patrolBoat", 4, 0, "x");
  },

  // takes the turn of the player listed
  takeTurn(player) {
    this.checkForOtherPlayerWin(player);
    if (player.humanOrComp === "human") {
      allEventListeners.addAttackListener();
    } else {
      player.randomMove(this.players[0]);
      reRenderBothBoards();
      this.takeTurn(this.players[0]);
    }
  },
  // on start of turn, checks to see if this player has lost from the previous players move
  checkForOtherPlayerWin(currentPlayer) {
    if (currentPlayer.gameboard.allSunk() === true) {
      // End The Game And Setup for Rematch
      alert(`${currentPlayer.name} lost the game`);
    }
  },
};

export { GameLoop };
