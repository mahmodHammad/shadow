function createCube() {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xffcc88 });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
const cube = createCube();
cube.castshadow = true;
cube.receiveShadow = false;
scene.add(cube);

var planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 20, 32);
planeGeometry.rotateX(90);
planeGeometry.rotateY(0);
planeGeometry.rotateZ(0);
var planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
