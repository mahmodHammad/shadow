import { GLTFLoader } from "../assets/GLTFLoader.js";
import { scene, render } from "./setup.js";

var modelLoader = new GLTFLoader();

function createModel() {
  modelLoader.load(
    "./assets/model/scene.gltf",
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.name === "head_6") {
          node.rotation.x = -Math.PI / 8;
          node.rotation.y = -Math.PI / 4;
          //   node.rotation.z = 2
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

export { createModel };
