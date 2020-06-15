function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
//   camera.rotateX(0.001)
//   camera.rotateY(0.001)
//   camera.rotateZ(0.001)
    renderer.render(scene, camera);
  }
  animate();