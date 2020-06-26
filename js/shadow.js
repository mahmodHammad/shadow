var light = new THREE.PointLight(0xffffee, 1, 100, 2);
light.position.set(15, 20, 7.5);
light.castShadow = true;

scene.add(light);
