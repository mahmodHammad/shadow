const point = document.querySelector(".point")


let morning = new Date(2020,6,13,10,0,0,0)
let sunPosition = SunCalc.getPosition(new Date() , 30,30)

point.style.transform=`rotate(${sunPosition.altitude}rad)`

console.log(sunPosition)
console.log( sunPosition.azimuth*180/Math.PI)
console.log( sunPosition.altitude*180/Math.PI)

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

getLocation().then(loc => console.log(loc));
