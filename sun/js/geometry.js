import * as THREE from "../assets/three.module.js";
import { scene, render } from "./setup.js";

function displayCoards() {
  // x red
  // y green
  // z blue

  function createCoord(x, y, z, color) {
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(100 * x, 100 * y, 100 * z));
    const material = new THREE.LineBasicMaterial({ color });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }

  createCoord(1, 0, 0, 0xff0000);
  createCoord(0, 1, 0, 0x00ff00);
  createCoord(0, 0, 1, 0x0000ff);
}

function displayPlate() {
  const planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
  planeGeometry.rotateX(-Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 1;
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
}
function createCylender(
  x = 0,
  y = 0,
  z = 0,
  br = 1,
  tr = 1.5,
  color = 0xffdf00,
  height = 10
) {
  const geometry = new THREE.CylinderGeometry(tr, br, height, 100);
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

function createBox(
  width,
  height,
  depth,
  x = 0,
  y = 0,
  z = 0,
  color = 0xffc0c0
) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  // cylender.translateX(x);
  cylender.translateY(height / 2 + y);
  // cylender.translateZ(z);
  scene.add(cylender);
  return cylender;
}

function createSphere(x = 0, y = 0, z = 0, color = 0xffffff) {
  var geometry = new THREE.SphereBufferGeometry(3, 32, 32);
  var material = new THREE.MeshStandardMaterial({ color });
  var sphere = new THREE.Mesh(geometry, material);
  sphere.translateX(x);
  sphere.translateY(4 + y);
  sphere.translateZ(z);
  scene.add(sphere);
}

function createArm(
  x = 0,
  y = 0,
  z = 0,
  br = 1,
  tr = 1.5,
  color = 0xbbffff,
  height = 20
) {
  const geometry = new THREE.CylinderGeometry(tr, br, height, 100);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  cylender.translateX(x);
  cylender.translateY(5 + y);
  cylender.translateZ(z);
  cylender.rotateX(Math.PI / 2);
  scene.add(cylender);
  return cylender;
}

function createFunery() {
  // createCylender(0, 0, 0);
  createCylender(0, 5, 0, 0.5, 1.5, 0xc0c0c0);
  createBox(4, 12, 9);
  createSphere(0, 12);
  createArm(0, 5, 0, 1, 1);
}

const sunSphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(20000, 16, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
sunSphere.position.y = -700000;
sunSphere.visible = false;

// POLES---------------------------------------------------------------------
const loader = new THREE.FontLoader();

loader.load("./assets/gentilis_regular.typeface.json", (font) => {
  var textMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xd4af37,
  });

  const fontAttributes = {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  function ceatePole(name, x, y, z) {
    const geometry = new THREE.TextGeometry(name, fontAttributes);
    const pole = new THREE.Mesh(geometry, textMaterial);
    pole.castShadow = true;
    pole.receiveShadow = true;

    pole.translateX(32 * x + 2);
    pole.translateY(30 * y);
    pole.translateZ(30 * z - 2);
    pole.rotateX(1.5 * Math.PI);
    pole.rotateZ(Math.PI);
    return pole;
  }
  const north = ceatePole("N", 0, 0, 1);
  const east = ceatePole("E", -1, 0, 0);
  const west = ceatePole("W", 1, 0, 0);
  const south = ceatePole("S", 0, 0, -1);

  scene.add(north);
  scene.add(east);
  scene.add(west);
  scene.add(south);
  render();
});

export { displayCoards, displayPlate, createFunery, sunSphere };
