// change those urls to work on production
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "../node_modules/three/examples/jsm/objects/Sky.js";

var camera, controls, scene, renderer;

var sky, sunSphere;
var light = new THREE.PointLight(0xffffee, 40, 100, 10);

init();
render();

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

  var effectController = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: !true,
  };

  var distance = 400000;

  function guiChanged() {
    var uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
    uniforms["luminance"].value = effectController.luminance;

    function calculateSunPosition() {
      var theta = Math.PI * (effectController.inclination - 0.5);
      var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

      sunSphere.position.x = distance * Math.cos(phi);
      sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

      sunSphere.visible = effectController.sun;

      uniforms["sunPosition"].value.copy(sunSphere.position);
    }
    calculateSunPosition();
    const { x, y, z } = sunSphere.position;
    updateLightPosition(light, x, y, z);

    renderer.render(scene, camera);
  }

  var gui = new GUI();

  gui.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(guiChanged);
  gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
  gui
    .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
    .onChange(guiChanged);
  gui
    .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
    .onChange(guiChanged);
  gui.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
  gui.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
  gui.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
  gui.add(effectController, "sun").onChange(guiChanged);
  const { x, y, z } = sunSphere.position;
  guiChanged();
}

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    200000
  );
  camera.position.set(10, 50, 100);

  scene = new THREE.Scene();

  var helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
  scene.add(helper);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.maxPolarAngle = Math.PI / 2;

  displayPlate();
  initSky();
  createFunery();
  illum();

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

function createCylender(
  x = 0,
  y = 0,
  z = 0,
  br = 1,
  tr = 1.5,
  color = 0xffffff
) {
  const geometry = new THREE.CylinderGeometry(tr, br, 10, 100);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  cylender.translateX(x);
  cylender.translateY(5 + y);
  cylender.translateZ(z);
  scene.add(cylender);
  return cylender;
}

function createFunery() {
  createCylender(0, 0, 0);
}

//  illuminate all objects in the scene equally.

function displayPlate() {
  const planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 20, 32);
  planeGeometry.rotateX(- Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial();
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
}

function illum() {
  //  illuminate all objects in the scene equally.
  const illumination = new THREE.AmbientLight(0x111111);
  scene.add(illumination);

  light.castShadow = true;
  scene.add(light);

  const { x, y, z } = sunSphere.position;
  updateLightPosition(light, x, y, z);
}

function updateLightPosition(light, x, y, z) {
  light.position.set(x / 10000, y / 10000, 5);
}
