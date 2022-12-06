import { Block } from "./GameObject/TerrainObject.js";
import { HeroObject } from "./GameObject/HeroObject.js";
import { ObjectManager } from "./ObjectManager.js";

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
  },
  objManager: new ObjectManager(),
};

state.objManager.addObject(new HeroObject(0, 0), "player");
state.objManager.addObject(new Block(100, 100), "solidTerrain");
state.objManager.addObject(new Block(135, 100), "solidTerrain");
state.objManager.addObject(new Block(100, 135), "solidTerrain");

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
