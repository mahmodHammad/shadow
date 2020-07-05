import { GLTFLoader } from "../assets/GLTFLoader.js";
import { scene, render } from "./setup.js";

var modelLoader = new GLTFLoader();

function castShadow(gltf) {
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
    scene.add(gltf.scene);
    render();
  });
}

function createModel(shift) {
  modelLoader.load(
    "./assets/model/scene.gltf",
    function (gltf) {
      // castShadow(gltf);
      console.log(gltf);
  
    scene.add(gltf.scene);
     
      const body =
        gltf.scene.children[0].children[0].children[0].children[0].children[0]
          .children[0].children[0].children[0];
      ///////////////////////////////////////////////////////////////// Upper body
      const upperBody = body.children[0].children[0];
      const neck = upperBody.children[0];
      const head = neck.children[0];
      const head_sensor = head.children[0];
      ///////////////////////////////////////////////////////////////// Left Leg
      const leg_l = body.children[1];
      const knee_l = leg_l.children[0];
      const shin_l = knee_l.children[0];
      const foot_l = shin_l.children[0];
      const toe_l = foot_l.children[0].children[0];
      ///////////////////////////////////////////////////////////////// Right Leg
      const leg_r = body.children[2];
      const knee_r = leg_r.children[0];
      const shin_r = knee_r.children[0];
      const foot_r = shin_r.children[0];
      const toe_r = foot_r.children[0].children[0];
      ///////////////////////////////////////////////////////////////// Left Arm
      const arm_l = upperBody.children[1];
      const arm_l_bi = arm_l.children[0];
      const arm_l_elbow = arm_l_bi.children[0];
      const forearm_l = arm_l_elbow.children[0];
      const hand_l = forearm_l.children[0].children[0];
      ///////////////////////////////////////////////////////////////// Right Arm
      const arm_r = upperBody.children[2];
      const arm_r_bi = arm_r.children[0];
      const arm_r_elbow = arm_r_bi.children[0];
      const forearm_r = arm_r_elbow.children[0];
      const hand_r = forearm_r.children[0].children[0];
      
      
      body.position.x=shift
      body.rotation.y=Math.PI/2
      moveLef([
        body,
        upperBody,
      ])
      render()
      /////////////////////////////////////////////////////////////////

      runAnimation([
        // body,
        upperBody,
      ]);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function moveLef(node) {
  // if(node.rotation.x >Math.PI || node.rotation.x <Math.PI/2){
  //   direction *=-1
  // }
  node.forEach((e) => {
    e.rotation.y -= Math.PI / 4;
    // e.rotation.y += Math.PI / 170;
    // e.rotation.z += Math.PI / 300;
  });
}

function runAnimation(node) {
  setInterval(() => {
    // moveLef(node);

    render();
  }, 111);
}
export { createModel };
