import * as THREE from "../assets/three.module.js";
import { scene } from "./index.js";

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
  color = 0xffffff
) {
  const geometry = new THREE.CylinderGeometry(tr, br, 20, 100);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  cylender.translateX(x);
  cylender.translateY(10 + y);
  cylender.translateZ(z);
  scene.add(cylender);
  return cylender;
}

function createFunery() {
  createCylender(0, 0, 0);
}

export { displayCoards, displayPlate, createFunery };
