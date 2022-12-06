import { TILE_SIZE } from "../globals.js";
import { BasicObject } from "./BasicObject.js";

export class TerrainObject extends BasicObject {
  constructor(x, y, w, h, name) {
    super(x, y, w, h, name);
  }
}

export class Block extends TerrainObject {
  constructor(x, y) {
    super(x, y, TILE_SIZE, TILE_SIZE, "block");
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
