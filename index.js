const shadowContainer = document.querySelector(".shadow")
const RealShadow = document.querySelector(".real-shadow")
const userHeight = 200
let morning = new Date(2020,6,13,14,0,0,0)


function getShadow(coord ,  time=new Date()){
  const  {azimuth , altitude} = SunCalc.getPosition(time , coord.x,coord.y)
  const shadowLenth = userHeight * Math.cos(altitude)
  return{shadowLenth,azimuth}
}

function drawShadow(coord ,time){
  const  {shadowLenth , azimuth}=getShadow(coord,time)
  shadowContainer.style.transform=`rotate(${azimuth }rad)`
  RealShadow.style.height = `${shadowLenth}px`

}

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

getLocation().then(loc => {
  drawShadow(loc , morning)  
  console.log(loc)
});
