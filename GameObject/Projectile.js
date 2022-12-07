import { MovingObject } from "./MovingObject.js";

export class Projectile extends MovingObject {
  constructor(x, y, xVel, yVel, name) {
    super(x, y, 3, 3, name, xVel, yVel);
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
