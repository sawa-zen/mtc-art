import * as THREE from '../three';
import { random } from '../shared/utils';
const vertexShader = require('../shader/vertex.glsl');
const fragmentShader = require('../shader/fragment.glsl');
const dotData = require('../dot.json');

class Particles extends THREE.Group {
  _particleNum = 10000;
  _maxExplosionNum = 486;

  constructor() {
    super();

    // geometory
    this._geometry = new THREE.BufferGeometry();
    const vertexPositions = [];
    const vertexColors = [];
    const seedValues = [];

    const length = dotData.length;

    // 280 x 134
    const width = 280;
    const height = 134;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    for (let index = 0; index < length; index++) {
      vertexPositions.push(dotData[index][0] - halfWidth); // x
      vertexPositions.push(-dotData[index][1] + halfHeight); // y
      vertexPositions.push(0); // z
      vertexColors.push(dotData[index][2] / 255); // r
      vertexColors.push(dotData[index][3] / 255); // g
      vertexColors.push(dotData[index][4] / 255); // b
      vertexColors.push(dotData[index][5] / 255); // a
      seedValues.push(random(-100, 100));
    }

    const positions = new Float32Array(vertexPositions);
    const colors = new Float32Array(vertexColors);
    const seeds = new Float32Array(seedValues);

    this._geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this._geometry.addAttribute('color', new THREE.BufferAttribute(colors, 4));
    this._geometry.addAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // material
    this._material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
        explosionNum: {
          type: 'f',
          value: 0.0
        }
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

  explosion(explosionNum = 0) {
    if (explosionNum > this._maxExplosionNum) {
      explosionNum = this._maxExplosionNum;
    }
    this._material.uniforms.explosionNum.value = explosionNum;
  }

  update() {
    this._material.uniforms.time.value += 1;
  }
}

export default Particles;
