import { Block } from "./GameObject/TerrainObject.js";
import { HeroObject } from "./GameObject/HeroObject.js";

const canvas = document.querySelector("#game");
canvas.width = 300;
canvas.height = 200;
const context = canvas.getContext('2d');

let was = Date.now();
const fpsMeter = document.querySelector("#fps");

const blocks = [
  new Block(100, 100),
  new Block(135, 100),
  new Block(100, 135),
]

const hero = new HeroObject(0, 0);

const state = {
  keys: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  solidObjects: [
    new Block(100, 100),
    new Block(135, 100),
    new Block(100, 135),
  ]
}

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

  context.fillStyle = "blue";
  blocks.forEach(block => context.fillRect(block.x, block.y, block.width, block.height))

  hero.update(state);
  hero.draw(context);

  window.requestAnimationFrame(animate)
}

animate()
