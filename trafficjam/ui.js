const levelDropDown = document.getElementById("level_select");

for (const level of levels) {
  const newOption = document.createElement("option");
  newOption.value = level.name;
  newOption.innerText = level.name;
  levelDropDown.appendChild(newOption);
}

levelDropDown.addEventListener("change", (e) => {
  currentLevel = levelDropDown.selectedIndex;
  setupLevel(levelDropDown.selectedIndex, true);
  showErrorMessage("");
  updateNumbers();
  removeExecutingHighlights();
});

const executeBtn = document.getElementById("execute");
executeBtn.addEventListener("click", () => {
  const code = document.getElementById("input_code").value;
  attemptToRunCode(code);
});

let mode = 'manual'; // TODO(kjlubick) url params
const switchBtn = document.getElementById("switch");
switchBtn.addEventListener("click", () => {  
  if (mode === 'manual') {
    mode = 'programming';
    switchBtn.textContent = 'Switch to Manual mode.';
    document.getElementById("execute").classList.remove("hidden");
    document.getElementById("editor").classList.remove("hidden");
    document.getElementById("program_controls").classList.remove("hidden");
    document.getElementById("manual_controls").classList.add("hidden");
    document.getElementById("valid_commands").classList.remove("hidden");
  } else {
    mode = 'manual';
    switchBtn.textContent = 'Switch to Programming mode.';
    document.getElementById("execute").classList.add("hidden");
    document.getElementById("editor").classList.add("hidden");
    document.getElementById("program_controls").classList.remove("hidden");
    document.getElementById("manual_controls").classList.add("hidden");
    document.getElementById("valid_commands").classList.add("hidden");
  }
  setupLevel(currentLevel, true);
  showErrorMessage("");
  updateNumbers();
  removeExecutingHighlights();
});

let currentLevel = 0;

document.getElementById("board").addEventListener("click", (e) => {
  if (mode === 'manual') {
    handleBoardClick(e);
  } else {
    alert("Board is disabled during programming mode. Use the command box.")
  }
});

const editor = document.getElementById("input_code");
editor.addEventListener("input", () => {
  updateNumbers();
});
updateNumbers();

function updateNumbers() {
  let lines = (editor.value.match(/\n/g) || []).length;
  lines += 1;
  if (lines < 10) {
    lines = 10;
  }
  const numbersEle = document.querySelector("#editor .numbers");
  // Add new ones
  for (let i = numbersEle.children.length; i < lines; i++) {
    const newD = document.createElement("div");
    newD.innerText = (i+1);
    numbersEle.appendChild(newD);
  }
  // Remove old ones
  for (let i = numbersEle.children.length; i > lines; i--) {
    numbersEle.removeChild(numbersEle.lastChild);
  }
}

function showErrorMessage(msg) {
  document.getElementById("error_output").innerText = msg;
}