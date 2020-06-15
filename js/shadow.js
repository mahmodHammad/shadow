var light = new THREE.PointLight( 0xffffee, 2, 100,2 );
light.position.set( 50, 20, 10 );
light.castShadow = true;   

light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default


//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );


scene.add( light );