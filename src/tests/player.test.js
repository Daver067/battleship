import { Player } from "../scripts/player";

// expect player attack to send attack
test("player.attack will send the attack to enemy gameboard", () => {
  const myPlayer = new Player("me", "human");
  const enemy = new Player("you", "comp");
  myPlayer.attack(enemy, 5, 5);
  expect(enemy.gameboard.gameboard[5][5].shotHere).toBeTruthy();
  // ensure it is't always truthy
  expect(enemy.gameboard.gameboard[3][5].shotHere).toBeFalsy();
});
