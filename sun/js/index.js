import { OrbitControls } from "../assets/OrbitControls.js";
import * as THREE from "../assets/three.module.js";
import { calculateSunPosition, parseDate } from "./helpers.js";
import { onWindowResize } from "./listeners.js";
import { displayCoards, displayPlate, createFunery } from "./geometry.js";
import { illum, updateLightPosition, dirLight } from "./illumination.js";
import {initSky} from "./sky.js"
import {initGUI} from "./gui.js"
var camera, controls, scene, renderer;

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    200000
  );
  camera.position.set(40, 5, -60);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.maxPolarAngle = 3.13 / 2;

  displayPlate();
  initSky();
  initGUI()
  createFunery();
  illum();

  const time = parseDate(new Date());
  const sunSpherePosition = calculateSunPosition(time);
  updateLightPosition(dirLight, sunSpherePosition);

  displayCoards(scene);
}

function render() {
  renderer.render(scene, camera);
}

init();
render();

window.addEventListener("resize", onWindowResize, false);

export { scene, render, camera, renderer };
