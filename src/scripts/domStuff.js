import { GameLoop } from "./gameLoop";
import { renderShipModule } from "./placeShips";

const allEventListeners = {
  test: true,
  addPlayer1Listener: () => {
    const playerForm = document.getElementById("player1");
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const playerData = new FormData(playerForm);
      const player1 = playerData.get("player");
      GameLoop.setPlayers(player1);
      erasePageContent();
      // place your ships
      placeNextShip();
    });
  },
};

function placeNextShip() {
  if (GameLoop.players[0].gameboard.ships[0].locations.length === 0) {
    renderShipModule(GameLoop.players[0].gameboard.ships[0]);
  } else if (GameLoop.players[0].gameboard.ships[1].locations.length === 0) {
    eraseModule();
    renderShipModule(GameLoop.players[0].gameboard.ships[1]);
  } else if (GameLoop.players[0].gameboard.ships[2].locations.length === 0) {
    eraseModule();
    renderShipModule(GameLoop.players[0].gameboard.ships[2]);
  } else if (GameLoop.players[0].gameboard.ships[3].locations.length === 0) {
    eraseModule();
    renderShipModule(GameLoop.players[0].gameboard.ships[3]);
  } else if (GameLoop.players[0].gameboard.ships[4].locations.length === 0) {
    eraseModule();
    renderShipModule(GameLoop.players[0].gameboard.ships[4]);
  } else {
    eraseModule();
    console.log("start game!");
  }
}

function eraseModule() {
  const body = document.querySelector("body");
  const module = document.querySelector(".moduleBackground");
  body.removeChild(module);
}

function erasePageContent() {
  const container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstElementChild);
  }
}

// renders a players board
function renderBoard(player, humanOrComp) {
  const container = document.querySelector(".container");
  const playerBoardContainer = createNewElement("div", `${humanOrComp}`, " ");
  const boardContainer = createNewElement("div", `gridify`, " ");
  playerBoardContainer.appendChild(boardContainer);
  player.gameboard.gameboard.forEach((row) => {
    const rowDiv = createNewElement("div", "row", " ");
    row.forEach((cell) => {
      const cellDiv = createNewElement("div", `${humanOrComp}`, " ");
      cellDiv.classList.add("cell");
      rowDiv.appendChild(cellDiv);
    });
    boardContainer.appendChild(rowDiv);
  });
  playerBoardContainer.appendChild(
    createNewElement("h4", "boardTitle", `This is ${player.name}'s board`)
  );
  container.appendChild(playerBoardContainer);
}

// creates a fancy element with class and innterHTML imbedded
function createNewElement(type, addClass, innerHTML) {
  const domElement = document.createElement(type);
  domElement.classList.add(addClass);
  domElement.innerHTML = innerHTML;
  return domElement;
}

export { allEventListeners, renderBoard, placeNextShip };
