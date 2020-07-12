import { GLTFLoader } from "../assets/GLTFLoader.js";
import { scene, render } from "./setup.js";

var modelLoader = new GLTFLoader();

function loadModel() {
    return new Promise((resolve, reject) => {
      modelLoader.load(
        "./assets/model/scene.gltf",
        function (gltf) {
          resolve(gltf);
        },
        undefined,
        function (error) {
          console.error(error);
          reject(error);
        }
      );
    });
  }
  

function extractBones(gltf) {
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
  
    return {
      body,
      upperBody,
      neck,
      head,
      head_sensor,
      leg_l,
      knee_l,
      shin_l,
      foot_l,
      toe_l,
      leg_r,
      knee_r,
      shin_r,
      foot_r,
      toe_r,
      arm_l,
      arm_l_bi,
      arm_l_elbow,
      hand_l,
      arm_r,
      arm_r_bi,
      arm_r_elbow,
      forearm_r,
      hand_r,
    };
  }

  function castShadow(gltf) {
    gltf.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
      scene.add(gltf.scene);
      render();
    });
  }


export {extractBones , loadModel, castShadow}  