import { checkHorizontalCollision, checkVerticalCollision } from "../collision.js";

// An extension to BasicObject, includes movement variables/

import { BasicObject } from "./BasicObject.js";

export class MovingObject extends BasicObject {
  constructor(x, y, w, h, name, dir, xVel, yVel) {
    super(x, y, w, h, name);
    this.direction = dir;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  update(state) {
    state.objManager.solidTerrain.forEach(block => {
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
    });

    state.objManager.interactables.forEach(i => {
      if (checkHorizontalCollision(this, i)) {
        if (i.name === "teleport") {
          const teleTarget = state.objManager.interactables.find(item => item.pairId === i.pairId && item.id !== i.id);
          if (teleTarget) {
            if (this.xVel > 0) {
              this.left = teleTarget.right;
            } else if (this.xVel < 0) {
              this.right = teleTarget.left;
            };
            this.y = teleTarget.y + (this.y - i.y);
          };
        };
      };

      if (checkVerticalCollision(this, i)) {
        if (i.name === "teleport") {
          const teleTarget = state.objManager.interactables.find(item => item.pairId === i.pairId && item.id !== i.id);
          if (teleTarget) {
            if (this.yVel > 0) {
              this.top = teleTarget.bottom;
            } else if (this.yVel < 0) {
              this.bottom = teleTarget.top;
            };
            this.x = teleTarget.x + (this.x - i.x);
          };
        };
      };
    });

    this.x += this.xVel;
    this.y += this.yVel;
  }
}
