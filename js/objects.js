function createCube() {
  const geometry = new THREE.CylinderGeometry(0.5,0.5,5,100);
  const material = new THREE.MeshBasicMaterial({ color: 0xeeee22 });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
const cube = createCube();
scene.add(cube);

