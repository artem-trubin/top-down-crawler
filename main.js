import { PlayerObject } from "./GameObject/PlayerObject.js";
import { ObjectManager } from "./ObjectManager.js";
import { Coin } from "./GameObject/Coin.js";
import { Teleport } from "./GameObject/Teleport.js";

const canvas = document.querySelector("#game");
canvas.width = 300;
canvas.height = 200;
const context = canvas.getContext('2d');

let was = Date.now();
const fpsMeter = document.querySelector("#fps");

const state = {
  keys: {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  },
  objManager: new ObjectManager(),
};

state.objManager.addObject(new PlayerObject(0, 0), "player");

state.objManager.addObject(new Coin(200, 135), "collectables");
state.objManager.addObject(new Coin(200, 100), "collectables");
state.objManager.addObject(new Coin(200, 150), "collectables");
state.objManager.addObject(new Coin(200, 50), "collectables");

state.objManager.addObject(new Teleport(50, 50, "1"), "interactables");
state.objManager.addObject(new Teleport(150, 100, "1"), "interactables");

window.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      state.keys.up = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      state.keys.left = true;
      break;
    case "KeyD":
    case "ArrowRight":
      state.keys.right = true;
      break;
    case "KeyS":
    case "ArrowDown":
      state.keys.down = true;
      break;
    case "Space":
      state.keys.space = true;
      break;
  }
})

window.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      state.keys.up = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      state.keys.left = false;
      break;
    case "KeyD":
    case "ArrowRight":
      state.keys.right = false;
      break;
    case "KeyS":
    case "ArrowDown":
      state.keys.down = false;
      break;
    case "Space":
      state.keys.space = false;
      break;
  }
})

function animate() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const now = Date.now();
  fpsMeter.innerHTML = Math.round(1000 / (now - was));
  was = now;

  state.objManager.runUpdate(state);
  state.objManager.runDraw(context);

  window.requestAnimationFrame(animate)
}

animate()
