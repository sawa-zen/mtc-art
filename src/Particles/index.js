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
    for (let index = 0; index < this._particleNum; index++) {
      vertexPositions.push(random(-256, 256)); // x
      vertexPositions.push(random(-256, 256)); // y
      vertexPositions.push(random(-256, 256)); // z
    }

    const vertices = new Float32Array(vertexPositions);
    this._geometry.addAttribute('position', new THREE.BufferAttribute(vertices,3));

    // material
    this._material = new THREE.ShaderMaterial({
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
    this.rotation.x += 0.001;
    this.rotation.z += 0.001;
  }
}

export default Particles;
