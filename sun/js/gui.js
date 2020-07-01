import { GUI } from "../assets/dat.gui.module.js";
import { parseDate, calculateSunPosition } from "./helpers.js";
import { updateLightPosition, dirLight } from "./illumination.js";
import { render } from "./setup.js";
import { sky } from "./sky.js";
import {getTime  } from "./helpers.js";


const UIhour = document.querySelector(".hour")
const UIminute = document.querySelector(".minute")

const { hour, month, day } = parseDate(new Date());
var timeCtr = {
  hour,
  day,
  month,
};

function animateDay() {
 return setInterval(() => {
    let speed = 0.02
    timeCtr.hour = timeCtr.hour + speed
    UIhour.innerHTML = timeCtr.hour 
    const sunSpherePosition = calculateSunPosition(timeCtr);
    const { uniforms } = sky.material;
    uniforms["sunPosition"].value.copy(sunSpherePosition);

    updateLightPosition(dirLight, sunSpherePosition);
    render();
  }, 50);
}

function guiChanged() {
  const sunSpherePosition = calculateSunPosition(timeCtr);
  const { uniforms } = sky.material;
  uniforms["sunPosition"].value.copy(sunSpherePosition);
  const time = getTime(timeCtr)
  UIhour.innerHTML = time.getHours()
  UIminute.innerHTML = time.getMinutes()
   
  

  updateLightPosition(dirLight, sunSpherePosition);
  render();
}

function initGUI() {
  var gui = new GUI();
  gui.add(timeCtr, "hour", 4, 19, 0.05).onChange(guiChanged);
  gui.add(timeCtr, "day", 1, 30, 1).onChange(guiChanged);
  gui.add(timeCtr, "month", 1, 12, 1).onChange(guiChanged);
  guiChanged();
}
export { initGUI, animateDay, timeCtr };
