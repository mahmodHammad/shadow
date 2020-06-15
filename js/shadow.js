var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 10, 10, 0 );
light.castShadow = true;            // default false
scene.add( light );


//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default



