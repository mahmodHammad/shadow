// for General Calculations
import {SunCalc} from "../../suncalc.js"

function getTime(time) {
  const { hour, day, month } = time;

  const changedTime = new Date();
  const minutes = Math.ceil((hour % 2) * 60);
  changedTime.setMinutes(minutes);
  changedTime.setHours(Math.floor(hour));
  changedTime.setMonth(Math.floor(month) - 1);
  changedTime.setDate(Math.floor(day));

  return changedTime;
}

function calculateSunPosition(time, distance = 40000) {
  // phi - polar angle in radians from the y (up) axis. Default is 0.  [0-PI]
  // theta - equator angle in radians around the y (up) axis. Default is 0. [0-2PI]
  // Z Axis is the North Pole
  const sunPosition = getSunLocation(time);

  const phi = sunPosition.altitude;
  const theta = -sunPosition.azimuth;

  const y = distance * Math.sin(phi);
  const z = distance * Math.cos(phi) * Math.cos(theta);
  const x = distance * Math.cos(phi) * Math.sin(theta);

  return { x, y, z };
}

function getSunLocation(time, userLocation = { x: 31, y: 30.5 }) {
  const CurrentTime = getTime(time);
  
  const { azimuth, altitude } = SunCalc.getPosition(
    CurrentTime,
    userLocation.x,
    userLocation.y
  );
  return { azimuth, altitude };
}

function parseDate(date) {
  // const hour = date.getHours();
  const hour = 7;
  const month = date.getMonth();
  const day = date.getDate();
  return { hour, month, day };
}

export { calculateSunPosition, parseDate };
