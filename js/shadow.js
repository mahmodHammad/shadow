//  illuminate all objects in the scene equally.
const illumination = new THREE.AmbientLight(0x101010);
scene.add(illumination);

// sun
const light = new THREE.PointLight(0xffffee, 1, 100, 3);
light.position.set(5, 20, 7.5);
light.castShadow = true;

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

scene.add(light);



const sun = new THREE.PointLight(0xffffee, 0.5, 100, 1);
sun.position.set(5, 20, 7.5);
sun.castShadow = true;
scene.add(sun);



//Create a helper for the shadow camera (optional)
function displayLightHelper() {
  var helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);
}
// displayLightHelper()
// displayCoards()