import * as THREE from "../assets/three.module.js";
import { scene } from "./setup.js";
var dirLight = new THREE.DirectionalLight(0xffffbb, 1);

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
  dirLight.shadowCameraFar = 3500;
  dirLight.shadowBias = -0.0001;
  dirLight.shadowDarkness = 0.35;

  var d = 220;
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
}

function updateLightPosition(light, sunPosition) {
  const { x, y, z } = sunPosition;
  light.position.set(x / 10000, y / 10000, z / 10000);
}

export { illum, updateLightPosition, dirLight };
