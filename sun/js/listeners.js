import { camera, renderer, render } from "./setup.js";
import { animateDay } from "./gui.js";
const runBtn = document.querySelector(".run");

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

var clicked = 0;
let refreshIntervalId;

function handeClickRun() {
  let label = "Stop";
  if (clicked) {
    label = "Run";
    clicked = 0;
    clearInterval(refreshIntervalId);
  } else {
    refreshIntervalId = animateDay();
    label = "Stop";
    clicked = 1;
  }

  runBtn.innerHTML = label;
}

runBtn.addEventListener("click", handeClickRun);

export { onWindowResize };
