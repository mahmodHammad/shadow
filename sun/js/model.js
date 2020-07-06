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

function addMovementRestrictions(gltf) {
  const robot = extractBones(gltf);
  const { neck, upperBody } = robot;

  //+ve , -ve , direction, speed
  neck.limit = {
    x: [0.8, -0.14, 1, 5000],
    y: [1, -1, 1, 5],
    z: [0.5, -0.5, 1, 1000],
  };
  upperBody.limit = { x: [1.2, -0.8, 1, 5000], y: [1, -1, 1, 5] };

  return robot;
}

function createModel(shift) {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
    // console.log(gltf);

    const bones = addMovementRestrictions(gltf);

    const { neck, upperBody, body } = bones;
    upperBody.rotation.y = -0.9;
    body.position.x = shift;

    render();
    runAnimation([upperBody, neck]);
  });
  // castShadow(gltf);
}

function moveLef(nodes) {
  nodes.forEach((node) => {
    const directions = Object.keys(node.limit);
    directions.forEach((d) => {
      if (
        node.rotation[d] >= node.limit[d][0] ||
        node.rotation[d] <= node.limit[d][1]
      ) {
        node.limit[d][2] *= -1;
      }
      node.rotation[d] +=
        (node.limit[d][2] * Math.PI) / (10 * node.limit[d][3]);
    });
  });
}

function runAnimation(node) {
  setInterval(() => {
    moveLef(node);

    render();
  }, 58);
}
export { createModel };
