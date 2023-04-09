import * as THREE from 'three';
import loadWasmModule from './loadWasmModule';


export default class Simulation {

  wasm: WebAssembly.Exports;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;

  constructor() {
  }

  async initWasm(): Promise<void> {
    const wasmModule: WebAssembly.WebAssemblyInstantiatedSource = await loadWasmModule('simulation.wasm')
    this.wasm = wasmModule.instance.exports;
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  init(): void {
    this.initWasm();
    this.initScene();

    // Add some stuff
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  start(): void {
    this.update();
  }

  update() {
    window.requestAnimationFrame(() => this.update());

    this.cube.rotation.x += this.wasm.update(0.01);
    this.cube.rotation.y += this.wasm.update(0.01);

    this.renderer.render(this.scene, this.camera);
  }
}
