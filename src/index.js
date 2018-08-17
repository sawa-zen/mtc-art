// import {
//   WebGLRenderer,
//   PerspectiveCamera,
//   Scene,
// } from 'three';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { Scene } from 'three/src/scenes/Scene.js';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
import EventEmitter from 'eventemitter2';
import "@babel/polyfill";

class MtcArt extends EventEmitter {
  _count = 0;

  get domElement() {
    return this._renderer.domElement;
  }

  constructor() {
    super();

    if (MtcArt.instance) {
      return MtcArt.instance;
    }

    // レンダラー
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setPixelRatio(2);

    // カメラ
    this._camera = new THREE.PerspectiveCamera();
    this._camera.position.z = 50;
    this._camera.lookAt(0, 0, 0);

    // シーン
    this._scene = new THREE.Scene();

    // // Geometry
    // this._geometry = new THREE.ConeGeometry(1, 2, 3);
    //
    // // Material
    // this._material = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   wireframe: true,
    //   transparent: true,
    // });
    //
    // // Mesh
    // this._mesh = new THREE.Mesh(
    //   this._geometry,
    //   this._material,
    // );
    // this._scene.add(this._mesh);

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
    this._renderer.render(this._scene, this._camera);
  };
}

export default MtcArt;
