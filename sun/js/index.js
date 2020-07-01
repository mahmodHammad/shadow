import { onWindowResize } from "./listeners.js";
import { run, render } from "./setup.js";

run();
render();

window.addEventListener("resize", onWindowResize, false);
