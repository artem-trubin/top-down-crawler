import { DEBUG_MODE } from "../globals.js";

import { checkHorizontalCollision, checkVerticalCollision } from "../collision.js";
import { MovingObject } from "./MovingObject.js";

export class HeroObject extends MovingObject {
  constructor(x, y) {
    super(x, y, 20, 25, "hero", "right", 0, 0);
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
      this.yVel = -5;
    } else if (state.keys.down) {
      this.direction = "down";
      this.yVel = 5;
    };

    if (state.keys.left && state.keys.right || !state.keys.left && !state.keys.right) {
      this.xVel = 0;
    } else if (state.keys.left) {
      this.direction = "left";
      this.xVel = -5;
    } else if (state.keys.right) {
      this.direction = "right";
      this.xVel = 5;
    }

    state.objManager.solidTerrain.forEach(col => {
      if (col.name === "block") {
        if (checkHorizontalCollision(this, col)) {
          if (this.xVel > 0) {
            this.right = col.left;
          } else if (this.xVel < 0) {
            this.left = col.right;
          };
          this.xVel = 0;
        }
        if (checkVerticalCollision(this, col)) {
          if (this.yVel > 0) {
            this.bottom = col.top;
          } else if (this.yVel < 0) {
            this.top = col.bottom;
          }
          this.yVel = 0;
        }
      }
    })

    this.x += this.xVel;
    this.y += this.yVel;
  }
}
