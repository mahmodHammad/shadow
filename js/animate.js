function animate() {
  requestAnimationFrame(animate);
  controls.update();
  light.position.set(Math.random() * 15, 1, Math.random() * 15);

  renderer.render(scene, camera);
}
animate();
