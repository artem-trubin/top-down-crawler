import { DEBUG_MODE } from "../globals.js";
import { msg } from "../utils.js";

import { checkHorizontalCollision, checkVerticalCollision } from "../collision.js";
import { MovingObject } from "./MovingObject.js";

export class PlayerObject extends MovingObject {
  constructor(x, y) {
    super(x, y, 20, 25, "hero", "right", 0, 0);
    this.xSpeed = 3;
    this.ySpeed = 3;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (DEBUG_MODE) {
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
  }

  update(state) {
    if (state.keys.up && state.keys.down || !state.keys.up && !state.keys.down) {
      this.yVel = 0;
    } else if (state.keys.up) {
      this.direction = "up";
      this.yVel = -this.ySpeed;
    } else if (state.keys.down) {
      this.direction = "down";
      this.yVel = this.ySpeed;
    };

    if (state.keys.left && state.keys.right || !state.keys.left && !state.keys.right) {
      this.xVel = 0;
    } else if (state.keys.left) {
      this.direction = "left";
      this.xVel = -this.xSpeed;
    } else if (state.keys.right) {
      this.direction = "right";
      this.xVel = this.xSpeed;
    }

    state.objManager.collectables.forEach(col => {
      if (checkHorizontalCollision(this, col) || checkVerticalCollision(this, col)) {
        if (col.name === "coin") {
          msg("Coin collected");
          // console.log(col);
          state.objManager.removeObject(col);
        }
      }
    });

    super.update(state);
  }
}
