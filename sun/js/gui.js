import { GUI } from "../assets/dat.gui.module.js";
import { parseDate, calculateSunPosition } from "./helpers.js";
import { updateLightPosition, dirLight } from "./illumination.js";
import { render } from "./setup.js";
import { uniforms } from "./sky.js";
import { getTime } from "./helpers.js";

const UIhour = document.querySelector(".hour");
const UIminute = document.querySelector(".minute");
const UItimelabel = document.querySelector(".time-label");

const { hour, month, day } = parseDate(new Date());
var timeCtr = {
  hour,
  day,
  month,
};

function toTime(digit){
 return digit<10 ? "0"+String(digit):digit
}
function parseHour(hour){
  return hour>12?hour-12:hour
}

function displayTimeUI() {
  const time = getTime(timeCtr);
  let hour = time.getHours();
  let minute =time.getMinutes();
  let label = hour>12?"pm":"am"
  hour = parseHour(hour)
  hour = toTime(hour)
  minute = toTime(minute)

  UIhour.innerHTML = hour
  UIminute.innerHTML = minute
  UItimelabel.innerHTML = label
}

function animateDay() {
  return setInterval(() => {
    let speed = 0.05;
    timeCtr.hour = timeCtr.hour + speed;
    // fix the flickering issue
    if (timeCtr.hour % 1 < 0.96) {
      guiChanged();
    }
  }, 100);
}

function guiChanged() {
  const sunSpherePosition = calculateSunPosition(timeCtr);

  uniforms["sunPosition"].value.copy(sunSpherePosition);
  displayTimeUI();
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
