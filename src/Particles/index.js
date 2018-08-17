import * as THREE from '../three';
import { random } from '../shared/utils';
const vertexShader = require('../shader/vertex.glsl');
const fragmentShader = require('../shader/fragment.glsl');

class Particles extends THREE.Group {
  _particleNum = 1000;

  constructor() {
    super();

    // geometory
    this._geometry = new THREE.BufferGeometry();
    const vertexPositions = [];
    for (let index = 0; index < this._particleNum; index++) {
      vertexPositions.push(random(-1000, 1000)); // x
      vertexPositions.push(random(-1000, 1000)); // y
      vertexPositions.push(random(-1000, 1000)); // z
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
        size: {
          type: 'f',
          value: 32.0
        }
      },
      vertexShader,
      fragmentShader,
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

  _createTexture = () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let grad = null;
    let texture = null;

    canvas.width = 128;
    canvas.height = 128;
    grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.arc(64, 64, 64, 0, Math.PI / 180, true);
    ctx.fill();

    texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
  }
}

export default Particles;
