import { BasicObject } from "./BasicObject.js";

export class MovingObject extends BasicObject {
  constructor(x, y, w, h, name, dir, xVel, yVel) {
    super(x, y, w, h, name);
    this.direction = dir;
    this.xVel = xVel;
    this.yVel = yVel;
  }
}
