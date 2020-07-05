import { GLTFLoader } from "../assets/GLTFLoader.js";
import { scene, render } from "./setup.js";

var modelLoader = new GLTFLoader();
const upperHalf = "spine1_34"
const neck = "neck_7"
const rightArm = "collarR_31"
let test = "hand1L_16"
test =  "thumb1L_15"
test =  "thumb2L_14"
test =  "thumb3L_13"
const UpperHalfLeg =  "hipL_38"
const LeftKnee =  "kneeL_37"
test = "kneeL_37"
test =  "toeL_41"
test =  "footL_35"
test =  "shinL_36"
test =  "hand2L_12"
test ="hand3L_11"
const leftArm = "collarL_19"
const leftHand = "handIKL_17"


function createModel() {
  modelLoader.load(
    "./assets/model/scene.gltf",
    function (gltf) {
      console.log(gltf)
      console.log(gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0])
      const body = gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0]
      
      const upperBody = body.children[0].children[0]
      const neck = upperBody.children[0]
      const head = neck.children[0]
      const head_sensor = head.children[0]

      const leg_l = body.children[1]
      const knee_l =  leg_l.children[0]
      const shin_l =  knee_l.children[0]
      const foot_l = shin_l.children[0]
      const toe_l = foot_l.children[0].children[0]
      console.log("toe",toe_l)

      const leg_r = body.children[2]
      const knee_r =  leg_r.children[0]
      const shin_r =  knee_r.children[0]
      const foot_r = shin_r.children[0]
      const toe_r = foot_r.children[0].children[0]
      console.log("Rtoe",toe_r)

      const arm_l = upperBody.children[1]
      const arm_l_bi = arm_l.children[0]
      const arm_l_elbow = arm_l_bi.children[0]
      const forearm_l = arm_l_elbow.children[0]
      const hand_l = forearm_l.children[0].children[0]
console.log(hand_l,"hand")

      const arm_r = upperBody.children[2]
      const arm_r_bi = arm_r.children[0]
      const arm_r_elbow = arm_r_bi.children[0]
      const forearm_r = arm_r_elbow.children[0]
      const hand_r = forearm_r.children[0].children[0]

      console.log(hand_r,"RRRRRRRRRRRRrhand")

      
      

   
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //const body =  plevis_55 
      //*****************************************/
      //const upperHalf =  spine1_34

      //*****************************************/
      //const leftLeg =  hipL_38
      //const body =  plevis_55
      //const body =  plevis_55
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // console.log(gltf.parser.json.nodes[0].rotation[0]=Math.PI/2)
      gltf.scene.traverse(function (node) {
        if (node.type == "Bone") {
          // console.log(node);
        }
        // node.scale.x=1.1
        // node.scale.y=1.1
        // node.scale.z=1.1
        // node.rotation.x =  Math.PI / 80;
        // node.rotation.z = -Math.PI / 20;
        // node.rotation.y = -Math.PI / 40;

 
      // if (node.name == leftArm ) {
      //   node.rotation.x += Math.PI / 2;
      // }

         if (node.name == UpperHalfLeg) {
          console.log("hey you ", node);
          // node.scale.x=2
          // node.scale.y=2
          // node.scale.z=2
          // node.rotation.y += Math.PI / 4;
          // node.rotation.x += Math.PI / 4;
          // node.rotation.z += Math.PI / 4;
          // node.position.x=10
          // node.position.x=0

          // runAnimation(node)

          // node.position.z=1
        }
        if (node.isMesh) {
          node.castShadow = true;
        }
        scene.add(gltf.scene);
        render();
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function moveLef(node){
  // if(node.rotation.x >Math.PI || node.rotation.x <Math.PI/2){
  //   direction *=-1
  // }
  node.rotation.x +=Math.PI/50;
}

function runAnimation (node1,node2){
  
  setInterval(() => {
    // node.position.y += 0.02;
    // let direction = 1
    // node.For
    //  moveLef(node1)
    //  moveLef(node2)
    render()
  }, 100);
}
runAnimation()
export { createModel };
