import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { ConeGeometry } from 'three/src/geometries/ConeGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Mesh } from 'three/src/objects/Mesh';
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

    // レンダラー
    this._renderer = new WebGLRenderer();
    this._renderer.setPixelRatio(2);

    // カメラ
    this._camera = new PerspectiveCamera();
    this._camera.position.z = 50;
    this._camera.lookAt(0, 0, 0);

    // シーン
    this._scene = new Scene();

    // Geometry
    this._geometry = new ConeGeometry(1, 2, 3);

    // Material
    this._material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
    });

    // Mesh
    this._mesh = new Mesh(
      this._geometry,
      this._material,
    );
    this._scene.add(this._mesh);

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
