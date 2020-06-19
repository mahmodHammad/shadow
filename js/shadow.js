//  illuminate all objects in the scene equally.
const illumination = new THREE.AmbientLight(0x101010);
scene.add(illumination);

// sun
const light = new THREE.PointLight(0xffffee, 40, 100, 2);
light.position.set(45, 95, 7.5);
light.castShadow = true;

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

scene.add(light);



//Create a helper for the shadow camera (optional)
function displayLightHelper() {
  var helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);
}
// displayLightHelper()
// displayCoards()