import { TILE_SIZE } from "../globals.js";
import { BasicObject } from "./BasicObject.js";

export class Block extends BasicObject {
  constructor(x, y) {
    super(x, y, TILE_SIZE, TILE_SIZE, "block");
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
