const canvas = document.querySelector("#game");
canvas.width = 300;
canvas.height = 200;
const context = canvas.getContext('2d');

let was = Date.now();
const fpsMeter = document.querySelector("#fps");

class Block {
  constructor(x, y) {
    this.width = 35;
    this.height = 35;
    this.x = x;
    this.y = y;
  }

  get top() { return this.y }
  get bottom() { return this.y + this.height }
  get left() { return this.x }
  get right() { return this.x + this.width }

  set top(v) { this.y = v }
  set bottom(v) { this.y = v - this.height }
  set left(v) { this.x = v }
  set right(v) { this.x = v - this.width }
}

const blocks = [
  new Block(100, 100),
  new Block(135, 100),
  new Block(100, 135),
]

class Hero {
  constructor(x, y) {
    this.width = 20;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.direction = "right";
    this.xVel = 0;
    this.yVel = 0;
  }

  get top() { return this.y }
  get bottom() { return this.y + this.height }
  get left() { return this.x }
  get right() { return this.x + this.width }

  set top(v) { this.y = v }
  set bottom(v) { this.y = v - this.height }
  set left(v) { this.x = v }
  set right(v) { this.x = v - this.width }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // dot to indicate facing direction
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
  }

  update() {
    if (keys.up && keys.down || !keys.up && !keys.down) {
      this.yVel = 0;
    } else if (keys.up) {
      this.direction = "up";
      this.yVel = -5;
    } else if (keys.down) {
      this.direction = "down";
      this.yVel = 5;
    }

    if (keys.left && keys.right || !keys.left && !keys.right) {
      this.xVel = 0;
    } else if (keys.left) {
      this.direction = "left";
      this.xVel = -5;
    } else if (keys.right) {
      this.direction = "right";
      this.xVel = 5;
    }

    blocks.forEach(block => {
      if (checkHorizontalCollision(this, block)) {
        if (this.xVel > 0) {
          this.right = block.left;
        } else if (this.xVel < 0) {
          this.left = block.right;
        };
        this.xVel = 0;
      }
      if (checkVerticalCollision(this, block)) {
        if (this.yVel > 0) {
          this.bottom = block.top;
        } else if (this.yVel < 0) {
          this.top = block.bottom;
        }
        this.yVel = 0;
      }
    })


    this.x += this.xVel;
    this.y += this.yVel;
  }
};

function checkHorizontalCollision(obj1, obj2) {
  if (obj1.xVel > 0) {
    // Going right
    if (
      obj1.right + obj1.xVel > obj2.left &&
      obj1.left + obj1.xVel < obj2.left &&
      (
        (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) ||
        (obj1.top > obj2.top && obj1.top < obj2.bottom)
      )
    ) {
      return true
    }
  } else if (obj1.xVel < 0) {
    // Going left
    if (
      obj1.left + obj1.xVel < obj2.right &&
      obj1.right + obj1.xVel > obj2.right &&
      (
        (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) ||
        (obj1.top > obj2.top && obj1.top < obj2.bottom)
      )
    ) {
      return true
    }
  }
  return false
}

function checkVerticalCollision(obj1, obj2) {
  if (obj1.yVel > 0) {
    // Going down
    if (
      obj1.bottom + obj1.yVel > obj2.top &&
      obj1.top + obj1.yVel < obj2.top &&
      (
        (obj1.right > obj2.left && obj1.right < obj2.right) ||
        (obj1.left > obj2.left && obj1.left < obj2.right)
      )
    ) {
      return true
    }
  } else if (obj1.yVel < 0) {
    // Going up
    if (
      obj1.top + obj1.yVel < obj2.bottom &&
      obj1.bottom + obj1.yVel > obj2.bottom &&
      (
        (obj1.right > obj2.left && obj1.right < obj2.right) ||
        (obj1.left > obj2.left && obj1.left < obj2.right)
      )
    ) {
      return true
    }
  }
  return false
}

const hero = new Hero(0, 0);


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
  blocks.forEach(block => context.fillRect(block.x, block.y, block.width, block.height))

  hero.update();
  hero.draw(context);

  window.requestAnimationFrame(animate)
}

animate()
