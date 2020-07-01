import { Sky } from "../assets/SKY.js";
import { GUI } from "../assets/dat.gui.module.js";
import { sunSphere } from "./geometry.js";
import { scene, render } from "./index.js";


const sky = new Sky();
sky.scale.setScalar(450000);

const {uniforms} = sky.material;
uniforms["turbidity"].value = 10;
uniforms["rayleigh"].value = 2;
uniforms["mieCoefficient"].value = 0.005;
uniforms["mieDirectionalG"].value = 0.8;
uniforms["luminance"].value = 1;

function initSky() {
  scene.add(sky);
  scene.add(sunSphere);
}

export { initSky , sky};
