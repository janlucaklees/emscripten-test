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
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xcccccc);
    this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
  }

  initLighting(scene: THREE.Scene) {
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.z = 5;
  }

	initControls(camera: THREE.Camera, renderer: THREE.Renderer): void {
    this.controls = new TrackballControls(camera, renderer.domElement);

    this.controls.rotateSpeed = 3.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.2;

    this.controls.keys = ['KeyA', 'KeyS', 'KeyD'];
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  async init(): Promise<Simulation> {
    await this.initWasm()
    this.initScene();
    this.initLighting(this.scene);
    this.initCamera();
    this.initRenderer();
    this.initControls(this.camera, this.renderer);

    // Add some stuff
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

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
