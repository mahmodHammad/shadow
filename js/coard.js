function createCoord(x, y, z, color) {
  const points = [];
  points.push(new THREE.Vector3(-10 * x, -10 * y, -10 * z));
  points.push(new THREE.Vector3(10 * x, 10 * y, 10 * z));
  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry()
    .setFromPoints(points)
    .scale(5, 2, 13);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

function displayCoards() {
  createCoord(1, 0, 0, 0xff0000);
  createCoord(0, 1, 0, 0x00ff00);
  createCoord(0, 0, 1, 0x0000ff);
}

// XY plane
const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 20, 32);
planeGeometry.rotateX(3.14 / 2);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
