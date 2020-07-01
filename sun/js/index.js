import { GUI } from "../assets/dat.gui.module.js";
import { OrbitControls } from "../assets/OrbitControls.js";
import { Sky } from "../assets/Sky.js";
import * as THREE from "../assets/three.module.js";
import { calculateSunPosition, parseDate } from "./helpers.js";
import { displayCoards, displayPlate, createFunery } from "./geometry.js";
import { illum, updateLightPosition, dirLight } from "./illumination.js";
var camera, controls, scene, renderer, sky, sunSphere;

function initSky() {
  // Add Sky
  sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20000, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  sunSphere.position.y = -700000;
  sunSphere.visible = false;
  scene.add(sunSphere);

  /// GUI
  const { hour, month, day } = parseDate(new Date());

  var effectController = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: !true,
    hour,
    day,
    month,
  };

  function guiChanged() {
    var uniforms = sky.material.uniforms;
    const {
      turbidity,
      rayleigh,
      mieCoefficient,
      mieDirectionalG,
      luminance,
      month,
      day,
      hour,
    } = effectController;

    uniforms["turbidity"].value = turbidity;
    uniforms["rayleigh"].value = rayleigh;
    uniforms["mieCoefficient"].value = mieCoefficient;
    uniforms["mieDirectionalG"].value = mieDirectionalG;
    uniforms["luminance"].value = luminance;

    
    const time = { hour, day, month };
    const sunSpherePosition = calculateSunPosition(time);
    sunSphere.visible = effectController.sun;

    uniforms["sunPosition"].value.copy(sunSpherePosition);

    updateLightPosition(dirLight, sunSpherePosition);

    renderer.render(scene, camera);
  }

  var gui = new GUI();
  gui.add(effectController, "hour", 4, 19, 0.05).onChange(guiChanged);
  gui.add(effectController, "day", 1, 30, 1).onChange(guiChanged);
  gui.add(effectController, "month", 1, 12, 1).onChange(guiChanged);
  guiChanged();
}

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
  createFunery();
  illum();

  const time = parseDate(new Date());
  const sunSpherePosition = calculateSunPosition(time);
  updateLightPosition(dirLight, sunSpherePosition);

  displayCoards(scene);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}

//  illuminate all objects in the scene equally.

init();
render();

export { scene };
