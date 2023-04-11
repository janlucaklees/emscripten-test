import { Class } from 'estree';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import initWasmSimulatorModule from './Simulator.js';



export default class Simulation {

  numberOfPlanets: number;
  g: number;
  minMass: number;
  maxMass: number;
  distributionRange: number;

  planetGeometries: Array<THREE.Mesh>

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: THREE.EventDispatcher;
  stats: Stats;

  wasmSimulatorModule: any;
  simulator: any;

  constructor(
    numberOfPlanets: number,
    g: number = 0.1,
    minMass: number = 1,
    maxMass: number = 10,
    distributionRange: number = 100,
  ) {
    this.numberOfPlanets = numberOfPlanets;
    this.g = g;
    this.minMass = minMass;
    this.maxMass = maxMass;
    this.distributionRange = distributionRange;
  }

  async initWasmSimulator(): Promise<void> {
    this.wasmSimulatorModule = await initWasmSimulatorModule();
    this.planetGeometries = [];
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

    this.camera.position.z = this.distributionRange * 1.2;
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

  initStats() {
    this.stats = new Stats();

    document.body.appendChild(this.stats.dom);
  }

  async init(): Promise<Simulation> {
    await this.initWasmSimulator()
    this.initScene();
    this.initLighting(this.scene);
    this.initCamera();
    this.initRenderer();
    this.initStats();
    this.initControls(this.camera, this.renderer);

    return this;
  }

  start(): void {
    this.simulator = new this.wasmSimulatorModule.Simulator(
      this.numberOfPlanets,
      this.g,
      this.minMass,
      this.maxMass,
      this.distributionRange,
    );

    this.placePlanets(
      this.simulator.getPlanets()
    );

    this.update();
  }

  update(): void {
    window.requestAnimationFrame(() => this.update());

    this.updatePlanets(
      this.simulator.update()
    );

    this.controls.update();
    this.stats.update();

    this.renderer.render(this.scene, this.camera);
  }

  placePlanets(planets): void {
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

    for (var i = 0; i < this.numberOfPlanets; i++) {
      const planet = planets.get(i);

      const radius = 3 * planet.mass / 4 * Math.PI;

      const geometry = new THREE.SphereGeometry(radius, 64, 32);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = planet.x;
      mesh.position.y = planet.y;
      mesh.position.z = planet.z;

      this.scene.add(mesh);

      this.planetGeometries[i] = mesh;
    }
  }

  updatePlanets(planets): void {
    for (var i = 0; i < this.numberOfPlanets; i++) {
      const planet = planets.get(i);
      const planetGeometry = this.planetGeometries[i];

      planetGeometry.position.x = planet.x;
      planetGeometry.position.y = planet.y;
      planetGeometry.position.z = planet.z;
    }
  }
}
