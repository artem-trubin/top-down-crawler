import { BasicObject } from "./BasicObject.js";

export class Teleport extends BasicObject {
  constructor(x, y, pairId) {
    super(x, y, 40, 40, "teleport");
    this.pairId = pairId;
  }

  draw(ctx) {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
