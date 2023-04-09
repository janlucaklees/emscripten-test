import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import loadWasmModule from './loadWasmModule';


export default class Simulation {

  wasmUpdate: CallableFunction;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  controls: THREE.EventDispatcher;

  constructor() {
  }

  async initWasm(): Promise<void> {
    const wasmModule: WebAssembly.WebAssemblyInstantiatedSource = await loadWasmModule('simulation.wasm')
    this.wasmUpdate = wasmModule.instance.exports.update as CallableFunction;
  }

  initScene(): void {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

	initControls(): void {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.controls.rotateSpeed = 3.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.2;

    this.controls.keys = ['KeyA', 'KeyS', 'KeyD'];
  }

  async init(): Promise<Simulation> {
    await this.initWasm()
    this.initScene();
    this.initControls();

    // Add some stuff
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

    this.camera.position.z = 5;

    return this;
  }

  start(): void {
    this.update();
  }

  update() {
    window.requestAnimationFrame(() => this.update());

    this.cube.rotation.x += this.wasmUpdate(0.01);
    this.cube.rotation.y += this.wasmUpdate(0.01);

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
