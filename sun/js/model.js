import { scene, render } from "./setup.js";
import{extractBones , loadModel,castShadow} from "./model_heloper.js"
const animationSpeed= 20

function addMovementRestrictions(gltf) {
  const robot = extractBones(gltf);
  const { neck, upperBody ,arm_l_bi ,body ,arm_r_bi ,knee_l ,knee_r} = robot;
body.rotation.z=Math.PI/2
// body.rotation.y=Math.PI/2
body.rotation.x=Math.PI/2

arm_l_bi.rotation.x=0
arm_l_bi.rotation.y=0
arm_l_bi.rotation.z=0

arm_r_bi.rotation.x=0
arm_r_bi.rotation.y=0
arm_r_bi.rotation.z=0
  //+ve , -ve , direction, speed
  neck.limit = {
    x: [0.8, -0.14, 1, 5000],
    y: [1, -1, 1, 5],
    z: [0.5, -0.5, 1, 1000],
  };
  upperBody.limit = { x: [1.2, -0.8, 1, 5000], y: [1, -1, 1, 5] };

  arm_l_bi.limit = { x: [1.2, -0.8, 1, 5], y: [1, -1, 1, 5] , z: [1, -1, 1, 5] }
  arm_r_bi.limit = { x: [1.2, -0.8, 1, 5], y: [1, -1, 1, 5] , z: [1, -1, 1, 5] }
  knee_l.limit = {  x: [1.75, 0, 1, 5] }
  knee_r.rotation.x=1.7
  knee_r.limit = {  x: [1.75, 0, -1,5] }
  
  return robot;
}

function createModel(shift) {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);
   
    const bones = addMovementRestrictions(gltf);

    const { neck, upperBody,arm_r_bi, body ,arm_l_bi , knee_l , knee_r} = bones;
    body.position.x = shift;

    render();
    runAnimation([arm_l_bi,arm_r_bi , knee_l,  knee_r]);
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
  }, animationSpeed);
}
export { createModel };
