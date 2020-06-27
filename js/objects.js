function createCylender(
  x = 0,
  y = 0,
  z = 0,
  br = 1,
  tr = 1.5,
  color = 0xffdf00
) {
  const geometry = new THREE.CylinderGeometry(tr, br, 10, 100);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  cylender.translateX(x);
  cylender.translateY(5 + y);
  cylender.translateZ(z);
  scene.add(cylender);
  return cylender;
}
createCylender(0, 5, 0, 0.5, 1.5, 0xc0c0c0);

function createBox(
  width,
  height,
  depth,
  x = 0,
  y = 0,
  z = 0,
  color = 0xc0c0c0
) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylender = new THREE.Mesh(geometry, material);
  cylender.castShadow = true; //default is false
  cylender.receiveShadow = true;
  // cylender.translateX(x);
  cylender.translateY(height / 2 + y);
  // cylender.translateZ(z);
  scene.add(cylender);
  return cylender;
}

createBox(5, 12, 11);

function createSphere(x=0,y=0,z=0,color = 0xc0c0c0) {
  var geometry = new THREE.SphereBufferGeometry(3, 32, 32);
  var material = new THREE.MeshStandardMaterial({ color });
  var sphere = new THREE.Mesh(geometry, material);
  sphere.translateX(x);
  sphere.translateY(5 + y);
  sphere.translateZ(z);
  scene.add(sphere);
}

createSphere(0,12);
