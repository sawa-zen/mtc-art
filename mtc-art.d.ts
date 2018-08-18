declare module 'mtc-art' {
  class MtcArt {
    constructor();
    domElement: HTMLCanvasElement;
    resize(width: number, height: number): void;
    dispose(): void;
  }
  export default MtcArt;
}
