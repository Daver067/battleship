import { GameLoop } from "./gameLoop";

// makes the module for placing ships
function renderShipModule(shipToPlace) {
  const body = document.querySelector("body");
  const moduleBackground = createNewElement(
    "div",
    "moduleBackground",
    `   <h1>Place Your Ships!</h1><div id="playerBoard"></div><div id='shipType'><h2 id='placeYourThisShip'></div></div>`
  );
  body.appendChild(moduleBackground);
  renderObject(buildPlacementBoard(GameLoop.players[0]), "#playerBoard");
  renderObject(
    createNewElement(
      "div",
      "shipAndFlip",
      `<h2>place your ${shipToPlace.name}</h2><button id="rotate">Rotate Ship</button>`
    ),
    "#shipType"
  );
  let shipToPlaceInnerHtml = `<div class="cell"></div>`;
  for (let i = 1; i < shipToPlace.length; i++) {
    shipToPlaceInnerHtml += `<div class="cell"></div>`;
  }
  renderObject(
    createNewElement("div", `${shipToPlace.name}`, `${shipToPlaceInnerHtml}`),
    "#shipType"
  );
}

function rotateShip() {
  // swap the height and width of the ship div
  // change from flex-direction: row; to column
}

// build the player 1 gameboard
function buildPlacementBoard(player) {
  const playerBoardContainer = createNewElement("div", `human`, " ");
  const boardContainer = createNewElement("div", `gridify`, " ");
  playerBoardContainer.appendChild(boardContainer);
  player.gameboard.gameboard.forEach((row) => {
    const rowDiv = createNewElement("div", "row", " ");
    row.forEach((cell) => {
      const cellDiv = createNewElement("div", `human`, " ");
      cellDiv.classList.add("cell");
      for (const property in cell) {
        cellDiv.setAttribute(`${property}`, `${cell[property]}`);
      }
      rowDiv.appendChild(cellDiv);
    });
    boardContainer.appendChild(rowDiv);
  });
  return playerBoardContainer;
}

//
function renderObject(DomItemToRender, whereToRender) {
  const renderLocation = document.querySelector(whereToRender);
  renderLocation.appendChild(DomItemToRender);
}

function createNewElement(type, addClass, innerHTML) {
  const domElement = document.createElement(type);
  domElement.classList.add(addClass);
  domElement.innerHTML = innerHTML;
  return domElement;
}

export { renderShipModule };
