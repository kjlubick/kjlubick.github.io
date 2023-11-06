const CURRENT_VERSION = 4;
const version = localStorage.getItem("levelVersion");
if (!version || (+version) < CURRENT_VERSION) {
  localStorage.clear();
}
localStorage.setItem("levelVersion", CURRENT_VERSION);


const hash = location.hash;
if (hash === "#dev") {
  document.getElementById("reset_btn").classList.add("show");
}
if (hash.startsWith("#L")) {
  displayLevel(+hash.replace("#L", ""));
} else {
  displayLevel(0);
}

