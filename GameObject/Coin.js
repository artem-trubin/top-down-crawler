import { BasicObject } from "./BasicObject.js";

export class Coin extends BasicObject {
  constructor(x, y) {
    super(x, y, 10, 10, "coin");
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
