const canvas = document.querySelector("#game");
canvas.width = 300;
canvas.height = 200;
const context = canvas.getContext('2d');

let was = Date.now();
const fpsMeter = document.querySelector("#fps");

const block = {
  width: 35,
  height: 35,
  x: 130,
  y: 70,
};

const hero = {
  width: 20,
  height: 30,
  x: 0,
  y: 0,
  direction: "right",
  draw: function (ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);

    ctx.fillStyle = "white";
    switch (this.direction) {
      case "right":
        ctx.fillRect(this.x + 20, this.y + 14, 2, 2);
        break;
      case "left":
        ctx.fillRect(this.x - 2, this.y + 14, 2, 2);
        break;
      case "up":
        ctx.fillRect(this.x + 8, this.y - 2, 2, 2);
        break;
      case "down":
        ctx.fillRect(this.x + 8, this.y + 30, 2, 2);
        break;
    }
  },
  update: function () {
    if (keys.right) {
      this.direction = "right";
      if (
        this.x + this.width + 5 > block.x &&
        this.x < block.x &&
        (
          (this.y > block.y && this.y < block.y + block.height) ||
          (this.y + this.height < block.y + block.height && this.y + this.height > block.y)
        )
      ) {
        this.x = block.x - this.width;
      } else {
        this.x += 5;
      }
    }
    if (keys.left) {
      this.direction = "left";
      if (
        this.x - 5 < block.x + block.width &&
        this.x + this.width > block.x + block.width &&
        (
          (this.y > block.y && this.y < block.y + block.height) ||
          (this.y + this.height < block.y + block.height && this.y + this.height > block.y)
        )
      ) {
        this.x = block.x + block.width;
      } else {
        this.x -= 5;
      }
    }
    if (keys.up) {
      this.direction = "up";
      if (
        this.y - 5 < block.y + block.height &&
        this.y + this.height > block.y + block.height &&
        (
          (this.x > block.x && this.x < block.x + block.width) ||
          (this.x + this.width > block.x && this.x + this.width < block.x + block.width)
        )
      ) {
        this.y = block.y + block.height
      } else {
        this.y -= 5
      }
    }
    if (keys.down) {
      this.direction = "down";
      if (
        this.y + this.height + 5 > block.y &&
        this.y < block.y &&
        (
          (this.x > block.x && this.x < block.x + block.width) ||
          (this.x + this.width > block.x && this.x + this.width < block.x + block.width)
        )
      ) {
        this.y = block.y - this.height
      } else {
        this.y += 5
      }
    }
  }
};


const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      keys.up = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.left = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = true;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.down = true;
      break;
  }
})

window.addEventListener("keyup", ({ code }) => {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      keys.up = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.left = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = false;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.down = false;
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
  context.fillRect(block.x, block.y, block.width, block.height);

  hero.update();
  hero.draw(context);

  window.requestAnimationFrame(animate)
}

animate()
