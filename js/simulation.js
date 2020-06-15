function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff1f20 });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
const cube = createCube();
scene.add(cube);

