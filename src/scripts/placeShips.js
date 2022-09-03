import { placeNextShip } from "./domStuff";
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
      `<h2>Click on a square to place your ${shipToPlace.name}<h2 class="errorMsg"></h2>></h2><button id="rotate">Rotate Ship</button>`
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
  addShipPlacementListener(shipToPlace);
  rotateEventListener(shipToPlace.name);
}

function rotateEventListener(shipName) {
  document.querySelector("button").addEventListener("click", () => {
    rotateShip(shipName);
  });
}

// function to rotate the ship on the page
function rotateShip(shipName) {
  const shipDom = document.querySelector(`.${shipName}`);
  shipDom.classList.toggle("flip");
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

// renders dom elements to the page
function renderObject(DomItemToRender, whereToRender) {
  const renderLocation = document.querySelector(whereToRender);
  renderLocation.appendChild(DomItemToRender);
}

//creates element, adds a class, and innerHTML
function createNewElement(type, addClass, innerHTML) {
  const domElement = document.createElement(type);
  domElement.classList.add(addClass);
  domElement.innerHTML = innerHTML;
  return domElement;
}

// event listeners for placing ships
function addShipPlacementListener(shipName) {
  const board = document.querySelector(".gridify");
  board.addEventListener("mousedown", (e) => {
    const yValue = e.target.attributes[3].value[0];
    const xValue = e.target.attributes[3].value[2];
    let axis;
    document.querySelector(`.${shipName.name}`).classList.contains("flip")
      ? (axis = "y")
      : (axis = "x");

    const validPlacement = GameLoop.players[0].gameboard.placeShip(
      shipName.name,
      yValue,
      xValue,
      axis
    );
    if (validPlacement === "error") {
      const errorMsg = document.querySelector(".errorMsg");
      errorMsg.textContent = "You Cannot place a ship there";
    } else placeNextShip();
  });
}

// try to place the ship, if the ship placement has an error try again.
function randomShipPlacer(player, shipToPlace) {
  const randomYValue = Math.floor(Math.random() * 7);
  const randomXValue = Math.floor(Math.random() * 7);
  const randomAxis = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
  if (
    player.gameboard.placeShip(
      `${shipToPlace}`,
      randomYValue,
      randomXValue,
      randomAxis
    ) === "error"
  ) {
    randomShipPlacer(player, shipToPlace);
  }
}

export { renderShipModule, randomShipPlacer };
