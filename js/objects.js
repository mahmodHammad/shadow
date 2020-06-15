function createCube() {
  const geometry = new THREE.CylinderGeometry(1, 1, 10, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xffff88 });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true; //default is false
  cube.receiveShadow = true;
  return cube;
}
const cube = createCube();

scene.add(cube);

var planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 20, 32);
planeGeometry.rotateX(3.14 / 2);
planeGeometry.rotateY(0);
planeGeometry.rotateZ(0);
var planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
