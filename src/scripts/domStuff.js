import { GameLoop } from "./gameLoop";

const allEventListeners = {
  test: true,
  addPlayer1Listener: () => {
    const playerForm = document.getElementById("player1");
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const playerData = new FormData(playerForm);
      const player1 = playerData.get("player");
      GameLoop.setPlayers(player1);
    });
  },
};

export { allEventListeners };
