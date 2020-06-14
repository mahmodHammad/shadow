const shadowContainer = document.querySelector(".shadow");
const RealShadow = document.querySelector(".real-shadow");
const hSlider = document.querySelector(".slider-h");
const timeUI = document.querySelector(".time");

const userHeight = 200; //use it for calculating shadow lenght
let morning = new Date();

// TimeSlider |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
// TimeSlider |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
function updateTime() {
  drawShadow({ x: 30, y: 30 }, morning);
  timeUI.setAttribute("datetime", morning);
  timeUI.innerHTML = String(morning).split("GMT")[0];
}

hSlider.oninput = function() {
  const time = this.value;
  const minutes = Math.ceil((time % 2) * 60);
  const hours = Math.floor(time);
  console.log("time", time);
  console.log("hours", hours);
  Math.ceil((2.3 % 2) * 60);
  morning.setMinutes(minutes);
  morning.setHours(hours);
  console.log("morning", morning);

  updateTime();
};
// TimeSlider |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-
// TimeSlider |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-

// Shadow |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
// Shadow |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
function getShadow(coord, time = new Date()) {
  const { azimuth, altitude } = SunCalc.getPosition(time, coord.x, coord.y);
  const shadowLenth = userHeight * Math.cos(altitude);
  return { shadowLenth, azimuth };
}

function drawShadow(coord, time) {
  const { shadowLenth, azimuth } = getShadow(coord, time);
  shadowContainer.style.transform = `rotate(${azimuth}rad)`;
  RealShadow.style.height = `${shadowLenth}px`;
}
// Shadow |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-
// Shadow |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-

// Location |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
// Location |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
function getLocation() {
  return new Promise((resovle, reject) => {
    let coord = {};
    window.navigator.geolocation.getCurrentPosition(
      e => {
        coord.x = e.coords.longitude;
        coord.y = e.coords.latitude;
        resovle(coord);
      },
      err => reject(err)
    );
  });
}

function useLocation() {
  getLocation()
    .then(loc => {
      const currentHoure = morning.getHours();
      hSlider.value = currentHoure;
      drawShadow(loc, morning);
    })
    .catch(err => {
      console.log(err);
      // Failed to get location -> use (30,30) for EGYPT
      //XXX Pick coordinates from a map later XXX
      drawShadow({ x: 30, y: 30 }, morning);
    });
}
// Location|-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-
// Location|-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-

function init() {
  updateTime();
  useLocation();
}
init();
