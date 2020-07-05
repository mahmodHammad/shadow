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
      console.log(gltf.parser.json.nodes[0].rotation[0]=Math.PI/2)
      gltf.scene.traverse(function (node) {
        if (node.type == "Bone") {
          console.log(node);
        }
        // node.scale.x=1.1
        // node.scale.y=1.1
        // node.scale.z=1.1
        // node.rotation.x =  Math.PI / 80;
        // node.rotation.z = -Math.PI / 20;
        // node.rotation.y = -Math.PI / 40;

 
      if (node.name == leftArm ) {
        node.rotation.x += Math.PI / 2;
      }

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
