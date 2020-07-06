import { OrbitControls } from "../assets/OrbitControls.js";
import * as THREE from "../assets/three.module.js";
import { calculateSunPosition, parseDate } from "./helpers.js";
import { displayCoards, displayPlate, createFunery } from "./geometry.js";
import { illum, updateLightPosition, dirLight } from "./illumination.js";
import { initSky } from "./sky.js";
import { initGUI, animateDay } from "./gui.js";
import { onWindowResize } from "./listeners.js";
import {createPoles} from "./poles.js"
import {createModel} from "./model.js"


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200000
);
camera.position.set(0, 10, 15);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// renderer.vr.enabled=true

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);
controls.maxPolarAngle = 3.13 / 2;

function run() {
  document.body.appendChild(renderer.domElement);

  displayPlate();
  initSky();
  initGUI();
  createFunery();
  illum();
  // createPoles()
  createModel(0)
  // createModel(10)
  // createModel(-3)
  // createModel(-10)

  // createModel(20)
  // createModel(20)
  // createModel(20)
  // createModel(20)
  // createModel(20)
  // animateDay()

  const time = parseDate(new Date());
  const sunSpherePosition = calculateSunPosition(time);

  updateLightPosition(dirLight, sunSpherePosition);

  displayCoards(scene);
}

function listen() {
  window.addEventListener("resize", onWindowResize, false);
}

function render() {
  renderer.render(scene, camera);
}

export { run, listen, render, scene, camera, renderer };
