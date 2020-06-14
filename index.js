const shadowContainer = document.querySelector(".shadow")
const RealShadow = document.querySelector(".real-shadow")
const slider = document.querySelector(".slider")
slider.oninput = function(){
  console.log(this.value)
  morning.setHours(this.value)
  console.log(morning)
  drawShadow({x:30,y:30},morning )  
}
const userHeight = 200
let morning = new Date()

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
  // availavble golbally
  var currentHoure = morning.getHours()
  slider.value=currentHoure
  drawShadow(loc,morning )  
}).catch(err=>{
  console.log(err)
  drawShadow({x:30,y:30} ,morning)
});
