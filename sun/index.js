// https://threejs.org/docs/#api/en/math/Spherical
// change those urls to work on production
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "../node_modules/three/examples/jsm/objects/Sky.js";

var camera, controls, scene, renderer;

var sky, sunSphere;
var dirLight = new THREE.DirectionalLight(0xffffbb, 1);

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
    hour: 7,
    day: 5,
    month: 1,
  };

  var distance = 40000;

  function getTime(hour, day, month) {
    const changedTime = new Date();
    const minutes = Math.ceil((hour % 2) * 60);
    changedTime.setMinutes(minutes);
    changedTime.setHours(Math.floor(hour));
    changedTime.setMonth(Math.floor(month) - 1);
    changedTime.setDate(Math.floor(day));

    return changedTime;
  }

  function getSunLocation(
    time = new Date(),
    userLocation = { x: 31, y: 30.5 }
  ) {
    const { azimuth, altitude } = SunCalc.getPosition(
      time,
      userLocation.x,
      userLocation.y
    );
    return { azimuth, altitude };
  }

  // UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU\
  //============================================================================->
  // nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn/
  function calculateSunPosition(distance, sunPosition) {
    // phi - polar angle in radians from the y (up) axis. Default is 0.  [0-PI]
    // theta - equator angle in radians around the y (up) axis. Default is 0. [0-2PI]

    const  phi= sunPosition.altitude;
    const theta = sunPosition.azimuth ;
    console.log(phi, theta)

    const alt = sunPosition.altitude;
    const azi = sunPosition.azimuth;

    // var phi = alt - Math.PI / 2;
    // var  theta= azi - Math.PI;

    // const phi = Math.PI / 2;
    // const theta = 2 * Math.PI - Math.PI;
    // phi = Math.PI/8
    // theta= Math.PI/2

    sunSphere.position.y = distance * Math.sin(phi);
    sunSphere.position.z = distance * Math.cos(phi) * Math.cos(theta);
    sunSphere.position.x = distance * Math.cos(phi) * Math.sin(theta);

    sunSphere.visible = effectController.sun;
    return sunSphere.position;
  }
  // UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU\
  //============================================================================->
  // nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn/

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

    const Ctime = getTime(hour, day, month);
    const sunPosition = getSunLocation(Ctime);

    const sunSpherePosition = calculateSunPosition(distance, sunPosition);

    uniforms["sunPosition"].value.copy(sunSpherePosition);

    const { x, y, z } = sunSphere.position;
    updateLightPosition(dirLight, x, y, z);

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
  displayCoards();

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
  const planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
  planeGeometry.rotateX(-Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 1;
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
}

function illum() {
  //  illuminate all objects in the scene equally.
  const illumination = new THREE.AmbientLight(0x1a1a1a);
  scene.add(illumination);

  dirLight.position.set(-1, 0.75, 1);
  dirLight.position.multiplyScalar(50);
  dirLight.name = "dirlight";

  scene.add(dirLight);

  dirLight.castShadow = true;
  dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;

  var d = 220;

  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;

  dirLight.shadowCameraFar = 3500;
  dirLight.shadowBias = -0.0001;
  dirLight.shadowDarkness = 0.35;

  const { x, y, z } = sunSphere.position;
  updateLightPosition(dirLight, x, y, z);
}

function updateLightPosition(light, x, y, z) {
  light.position.set(x / 10000, y / 10000, z / 10000);
}

function createCoord(x, y, z, color) {
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(100 * x, 100 * y, 100 * z));
  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry()
    .setFromPoints(points)
    .scale(2, 2, 2);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

function displayCoards() {
  createCoord(1, 0, 0, 0xff0000);
  createCoord(0, 1, 0, 0x00ff00);
  createCoord(0, 0, 1, 0x0000ff);
}
// x red
// y green
// z blue
