import {Vertex} from './vertex';

export default class Cube {
  constructor(center, side) {
    const d = side / 2;

    this.vertices = [
      new Vertex(center.x - d, center.y - d, center.z + d),
      new Vertex(center.x - d, center.y - d, center.z - d),
      new Vertex(center.x + d, center.y - d, center.z - d),
      new Vertex(center.x + d, center.y - d, center.z + d),
      new Vertex(center.x + d, center.y + d, center.z + d),
      new Vertex(center.x + d, center.y + d, center.z - d),
      new Vertex(center.x - d, center.y + d, center.z - d),
      new Vertex(center.x - d, center.y + d, center.z + d)
    ];

    this.faces = [
      [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
      [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
      [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
      [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
      [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
      [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];
  };
}
