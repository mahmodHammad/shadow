const board = document.querySelector(".view");
const shadowContainer = document.querySelector(".shadow");
const RealShadow = document.querySelector(".real-shadow");
const hSlider = document.querySelector(".slider-h");
const daySlider = document.querySelector(".slider-d");
const monthSlider = document.querySelector(".slider-m");
const angleSlider = document.querySelector(".slider-andgle");

const sens = document.querySelector(".sensor");

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

angleSlider.oninput = function() {
  const angle = this.value;
  board.style.transform = `rotate(${angle}deg)`;
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
sens.innerHTML ="Hiiiiiiiiiii"
window.addEventListener("deviceorientation", e => {
  console.log(e);
  
  sens.innerHTML = ` x:${e.isTrusted}, y:${e.beta}, z:${e.gamma}`;
});
window.addEventListener("devicemotion",e=>{
  console.log(e);
  
  // sens.innerHTML = ` x:${e.isTrusted}, y:${e.beta}, z:${e.gamma}`;
})
// function initSensor() {
//   let sensor = new Gyroscope();
//   sensor.start();
//   sens.innerHTML = "start Reading"
//   sensor.onreading = () => {
//       sens.innerHTML = ` x:${sensor.x}, y:${sensor.y}, z:${sensor.z}`
//       console.log("Angular velocity around the X-axis " + sensor.x);
//       console.log("Angular velocity around the Y-axis " + sensor.y);
//       console.log("Angular velocity around the Z-axis " + sensor.z);
//   };

//   sensor.onerror = event => console.log(event.error.name, event.error.message);
// }
// initSensor();

window.addEventListener('devicemotion',(e)=>alert(e.rotationRate))


let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
  alert("i'am reading")
  console.log("Acceleration along the X-axis " + acl.x);
  console.log("Acceleration along the Y-axis " + acl.y);
  console.log("Acceleration along the Z-axis " + acl.z);
});

acl.start();