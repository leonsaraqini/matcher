import { init, start } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    init();
    document.getElementById("startButton").addEventListener("click", start);
});
