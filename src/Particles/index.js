import * as THREE from '../three';
import { random } from '../shared/utils';
const vertexShader = require('../shader/vertex.glsl');
const fragmentShader = require('../shader/fragment.glsl');

class Particles extends THREE.Group {
  _particleNum = 10000;

  constructor() {
    super();

    // geometory
    this._geometry = new THREE.BufferGeometry();
    const vertexPositions = [];
    const seedValues = [];
    for (let index = 0; index < this._particleNum; index++) {
      vertexPositions.push(random(-256, 256)); // x
      vertexPositions.push(random(-256, 256)); // y
      vertexPositions.push(random(-256, 256)); // z
      seedValues.push(random(-100, 100));
    }

    const vertices = new Float32Array(vertexPositions);
    const seeds = new Float32Array(seedValues);

    this._geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    this._geometry.addAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // material
    this._material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    // points
    this._points = new THREE.Points(
      this._geometry,
      this._material,
    );
    this.add(this._points);
  }

  update() {
    this._material.uniforms.time.value += 1;
    this.rotation.x -= 0.0005;
    this.rotation.y -= 0.0005;
    this.rotation.z -= 0.0005;
  }
}

export default Particles;
