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

createCylender(-5, 0, 0);
createCylender(0, 0, 5, 0.1, 2, 0xc0c0c0);
createCylender(0, 0, 10, 0.1, 2, 0xc0c0c0);
createCylender(-5, 0, 15);
createCylender(10, 0, 5, 0.1, 2, 0xc0c0c0);
createCylender(10, 0, 10, 0.1, 2, 0xc0c0c0);
createCylender(5, 0, 5, 0.1, 2, 0xc0c0c0);
createCylender(5, 0, 10, 0.1, 2, 0xc0c0c0);
createCylender(15, 0, 0);
createCylender(15, 0, 15);
