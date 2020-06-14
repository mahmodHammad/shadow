const board = document.querySelector(".view");
const shadowContainer = document.querySelector(".shadow");
const RealShadow = document.querySelector(".real-shadow");
const hSlider = document.querySelector(".slider-h");
const daySlider = document.querySelector(".slider-d");
const monthSlider = document.querySelector(".slider-m");
const angleSlider = document.querySelector(".slider-andgle");
const reset = document.querySelector(".reset");

// const sens = document.querySelector(".sensor");

const timeUI = document.querySelector(".time");

const userHeight = 150; //use it for calculating shadow lenght
let morning = new Date();

// TimeSliders |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
// TimeSliders |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->START-
function updateTime() {
  drawShadow({ x: 30, y: 30 }, morning);
  timeUI.setAttribute("datetime", morning);
  timeUI.innerHTML = String(morning).split("GMT")[0];
}

hSlider.oninput = function() {
  const time = this.value;
  const minutes = Math.ceil((time % 2) * 60);
  const hours = Math.floor(time);
  morning.setMinutes(minutes);
  morning.setHours(hours);
  updateTime();
};

daySlider.oninput = function() {
  const day = this.value;
  morning.setDate(day);
  updateTime();
};

monthSlider.oninput = function() {
  const month = this.value;
  morning.setMonth(month);
  updateTime();
};

function rotateboard(angle){
  board.style.transform = `rotate(${angle}deg)`;
}

angleSlider.oninput = function() {
  const angle = this.value;
  rotateboard(angle)
};
// TimeSliders |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-
// TimeSliders |-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_->END-

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
function initSliders() {
  const currentMonth = morning.getMonth();
  const currentDay = morning.getDate();
  const currentHoure = morning.getHours();
  monthSlider.value = currentMonth;
  daySlider.value = currentDay;
  hSlider.value = currentHoure;
}

function init() {
  initSliders();
  updateTime();
  useLocation();
}
init();

window.addEventListener("deviceorientation", e => {
  board.style.transform = `rotate(${Math.ceil(e.alpha)}deg)`;  
  // sens.innerHTML = ` x:${e.isTrusted}, y:${e.beta}, z:${e.gamma}`;
});

function resetTime(){
  const now = new Date()
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const currentHoure = now.getHours();
  morning.setMonth(currentMonth)
  morning.setDate(currentDay)
  morning.setHours(currentHoure)

  monthSlider.value = currentMonth;
  daySlider.value = currentDay;
  hSlider.value = currentHoure;
  angleSlider.value=0
  useLocation();
  updateTime();
  rotateboard(0)
}

reset.addEventListener("click" , ()=>{
  console.log("resetttt")
  resetTime()
})