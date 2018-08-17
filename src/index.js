import * as THREE from './three';
import Particles from './Particles';
import Stats from 'stats.js';
import "@babel/polyfill";

class MtcArt {
  _count = 0;

  get domElement() {
    return this._renderer.domElement;
  }

  constructor() {
    if (MtcArt.instance) {
      return MtcArt.instance;
    }

    // stats
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    // レンダラー
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setPixelRatio(1);

    // カメラ
    this._camera = new THREE.PerspectiveCamera();
    this._camera.position.z = 300;
    this._camera.lookAt(0, 0, 0);

    // シーン
    this._scene = new THREE.Scene();

    // パーティクル群
    this._particles = new Particles();
    this._scene.add(this._particles);

    // 描画開始
    this._render();

    MtcArt.instance = this;
    return this;
  }

  resize(w, h) {
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(w, h);
  }

  dispose() {
    cancelAnimationFrame(this._animationFrameId);
    MtcArt.instance = null;
  }

  _render = () => {
    this._count++;
    this._animationFrameId = requestAnimationFrame(this._render);

    if (this._count % 2) {
      return;
    }

    this._stats.begin();
    this._renderer.render(this._scene, this._camera);
    this._stats.end();
  };
}

export default MtcArt;
