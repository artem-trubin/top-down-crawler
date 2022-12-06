export class BasicObject {
  constructor(x, y, w, h, name) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.name = name;
  }

  draw() { };
  update() { };

  get top() { return this.y }
  get bottom() { return this.y + this.height }
  get left() { return this.x }
  get right() { return this.x + this.width }

  set top(v) { this.y = v }
  set bottom(v) { this.y = v - this.height }
  set left(v) { this.x = v }
  set right(v) { this.x = v - this.width }
}
