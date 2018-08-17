import * as THREE from '../three';
import { random } from '../shared/utils';

class Particles extends THREE.Group {
  _particleNum = 2000;

  constructor() {
    super();

    // geometory
    this._geometry = new THREE.BufferGeometry();
    const vertexPositions = [];
    for (let index = 0; index < this._particleNum; index++) {
      vertexPositions.push(random(-100, 100)); // x
      vertexPositions.push(random(-100, 100)); // y
      vertexPositions.push(random(-100, 100)); // z
    }

    const vertices = new Float32Array(vertexPositions);
    this._geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));

    // material
    this._material = new THREE.PointsMaterial({
      color: 0xffffff,
    });

    // points
    this._points = new THREE.Points(
      this._geometry,
      this._material,
    );
    this.add(this._points);
  }

  update() {
  }
}

export default Particles;
