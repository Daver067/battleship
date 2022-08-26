import { GameLoop } from "./gameLoop";
import { renderShipModule } from "./placeShips";

const allEventListeners = {
  test: true,
  // listener for starting the game
  addPlayer1Listener: () => {
    const playerForm = document.getElementById("player1");
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const playerData = new FormData(playerForm);
      const player1 = playerData.get("player");
      GameLoop.setPlayers(player1);
      erasePageContent();
      placeNextShip();
    });
  },
  // listener for attacking the enemy gameboard
  addAttackListener: () => {
    const enemyBoard = document.querySelector(".computer").firstElementChild;
    enemyBoard.addEventListener("mousedown", (e) => {
      const yValue = e.target.attributes[3].value[0];
      const xValue = e.target.attributes[3].value[2];
      GameLoop.players[0].attack(GameLoop.players[1], yValue, xValue);
      reRenderBothBoards();
      GameLoop.takeTurn(GameLoop.players[1]);
      //if its already been attacked
    });
  },
};

// placing the ships one at a time, then starting the game once all placed
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
    GameLoop.startGame();
  }
}

// erases the current place ship module
function eraseModule() {
  const body = document.querySelector("body");
  const module = document.querySelector(".moduleBackground");
  body.removeChild(module);
}

// Erases everything on page except for the H1 'battle ship'
function erasePageContent() {
  const container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstElementChild);
  }
}

// clears the page, then renders both players boards
function reRenderBothBoards() {
  erasePageContent();
  renderBoard(GameLoop.players[0], GameLoop.players[0].humanOrComp);
  renderBoard(GameLoop.players[1], GameLoop.players[1].humanOrComp);
}

// renders one players board
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
      for (const property in cell) {
        cellDiv.setAttribute(`${property}`, `${cell[property]}`);
      }
      rowDiv.appendChild(cellDiv);
    });
    boardContainer.appendChild(rowDiv);
  });
  playerBoardContainer.appendChild(
    createNewElement("h4", "boardTitle", `This is ${player.name}'s board`)
  );
  container.appendChild(playerBoardContainer);
}

// erases all content and gets ready for a new game
function createStartGamePage() {
  erasePageContent();
  const container = document.querySelector(".container");
  const form = document.createElement("form");
  form.method = "post";
  form.action = "";
  form.id = "player1";
  const div = document.createElement("div");
  div.classList.add("playerName");
  div.innerHTML =
    '<label for="player" placeholder="player" required>Player 1 Name:</label><input type="text" name="player" id="player" />';
  form.appendChild(div);
  const button = document.createElement("button");
  button.type = "submit";
  button.innerHTML = "Submit";
  form.appendChild(button);
  container.appendChild(form);
  allEventListeners.addPlayer1Listener();
}

// creates a fancy element with class and innterHTML imbedded
function createNewElement(type, addClass, innerHTML) {
  const domElement = document.createElement(type);
  domElement.classList.add(addClass);
  domElement.innerHTML = innerHTML;
  return domElement;
}

export {
  allEventListeners,
  renderBoard,
  placeNextShip,
  createStartGamePage,
  reRenderBothBoards,
};
