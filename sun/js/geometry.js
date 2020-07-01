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

const sunSphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(20000, 16, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
sunSphere.position.y = -700000;
sunSphere.visible = false;

// POLES---------------------------------------------------------------------
const loader = new THREE.FontLoader();

loader.load( "./assets/gentilis_regular.typeface.json",   font => {
	var geometry = new THREE.TextGeometry( 'N', {
		font: font,
		size: 8,
		height: 3,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0,
		bevelSize: 0,
		bevelOffset: 0,
		bevelSegments: 5
  } );
 
  var textMaterial = new THREE.MeshPhongMaterial( 
    { color: 0xcccccc, specular: 0xffffff }
  );

  var mesh = new THREE.Mesh( geometry, textMaterial );
  mesh.castShadow = true; //default is false
  mesh.receiveShadow = true;
  mesh.translateX(0);
  mesh.translateY(0);
  mesh.translateZ(20);
  mesh.rotateX(1.5*Math.PI)
  mesh.rotateZ(Math.PI)
  scene.add( mesh );
} );

export { displayCoards, displayPlate, createFunery ,sunSphere };
