const shadowContainer = document.querySelector(".shadow");
const RealShadow = document.querySelector(".real-shadow");
const hSlider = document.querySelector(".slider-h");
const mSlider = document.querySelector(".slider-m");
const timeUI = document.querySelector(".time");

const userHeight = 200; //use it for calculating shadow lenght
let morning = new Date();

// Slider ------------------------------------->START
// Slider ------------------------------------->START
function updateTime() {
  drawShadow({ x: 30, y: 30 }, morning);
  timeUI.innerHTML = morning;
}

hSlider.oninput = function() {
  morning.setHours(this.value);
  updateTime();
};

mSlider.oninput = function() {
  morning.setMinutes(this.value);
  updateTime();
};
// Slider ------------------------------------->END
// Slider ------------------------------------->END

// Shadow ------------------------------------->START
// Shadow ------------------------------------->START
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
// Shadow ------------------------------------->END
// Shadow ------------------------------------->END

// Location ------------------------------------->START
// Location ------------------------------------->START
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
      const currentMinute = morning.getMinutes();
      hSlider.value = currentHoure;
      mSlider.value = currentMinute;
      drawShadow(loc, morning);
    })
    .catch(err => {
      console.log(err);
      // Failed to get location -> use (30,30) for EGYPT
      //XXX Pick coordinates from a map later XXX
      drawShadow({ x: 30, y: 30 }, morning);
    });
}
// Location ------------------------------------->END
// Location ------------------------------------->END

function init() {
  timeUI.setAttribute("datetime", morning);
  timeUI.innerHTML = morning;
  useLocation();
}
init();
