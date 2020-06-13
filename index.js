/*
1- get coordinates [X]
2- calculate dirction ****************
3- display the shadow in the ui as 2D
4- display the shadow in the ui as 3D
*/
let post = SunCalc.getPosition(new Date() , 30,30)
console.log(post)


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
