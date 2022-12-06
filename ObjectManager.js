import { msg } from "../utils.js";

export class ObjectManager {
  constructor() {
    this.nextObjectId = 0;

    this.player = [];
    this.solidTerrain = [];
  }

  addObject(obj, layer) {
    obj.id = this.nextObjectId;
    this.nextObjectId++;

    switch (layer) {
      case "player":
        this.player.push(obj);
        break;
      case "solidTerrain":
        this.solidTerrain.push(obj);
        break;
      default:
        msg("No such layer: " + layer);
        break;
    }
  }

  removeObject(obj) {
    const compareId = (o) => o.id !== obj.id;
    switch (obj.layer) {
      case "player":
        this.player = this.player.filter(compareId);
        break;
      case "solidTerrain":
        this.player = this.solidTerrain.filter(compareId);
        break;
      default:
        msg("No such layer " + layer);
        break;
    }
  }

  runUpdate(state) {
    this.player.forEach(p => p.update(state));
  }

  runDraw(ctx) {
    this.solidTerrain.forEach(s => s.draw(ctx));
    this.player.forEach(p => p.draw(ctx));
  }
}
