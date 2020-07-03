import * as THREE from "../assets/three.module.js";
import { scene } from "./setup.js";

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

function createFunery() {}

const sunSphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(20000, 16, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
sunSphere.position.y = -700000;
sunSphere.visible = false;

// POLES---------------------------------------------------------------------


export { displayCoards, displayPlate, createFunery, sunSphere };
