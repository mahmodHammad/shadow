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
    specular: 0xD4AF37,
  });

  const fontAttributes = {
    font: font,
    size: 5,
    height: 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  function ceatePole(name,x, y, z) {
    const geometry = new THREE.TextGeometry(name, fontAttributes);
    const pole = new THREE.Mesh(geometry, textMaterial);
    // pole.castShadow = true;
    pole.receiveShadow = true;

    pole.translateX(32 * x + 2);
    pole.translateY(30 * y);
    pole.translateZ(30 * z - 2);
    pole.rotateX(1.5 * Math.PI);
    pole.rotateZ(Math.PI);
    return pole;
  }
  const north = ceatePole("N",0, 0, 1);
  const east = ceatePole("E",-1, 0, 0);
  const west = ceatePole("W",1, 0, 0);
  const south = ceatePole("S",0, 0, -1);

  scene.add(north);
  scene.add(east);
  scene.add(west);
  scene.add(south);

});

export { displayCoards, displayPlate, createFunery, sunSphere };
