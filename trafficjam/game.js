const CURRENT_VERSION = 4;
async function init() {
  const version = localStorage.getItem("levelVersion");
  if (!version || (+version) < CURRENT_VERSION) {
    localStorage.clear();
  }
  localStorage.setItem("levelVersion", CURRENT_VERSION);

  await loadAssets(["board_big"]);

  await setupLevel(currentLevel, true);
  gameLoop();
}
const assets = {};
async function loadAssets(toLoad) {
  const promises = [];
  for (const asset of toLoad) {
    if (assets[asset]) {
      continue; // already loaded
    }
    promises.push(fetch(`img/${asset}.png`)
      .then((r) => r.blob())
      .then((blob) => createImageBitmap(blob))
      .then((ib) => {
        assets[asset] = ib;
      }));
  }
  await Promise.all(promises);
}

let vehicles = [];
let blocked = [];
async function setupLevel(level_num, overwrite_code) {
  hasCompletedLevel = false;
  loading = true;
  const level = levels[level_num];
  const area = document.getElementById("input_code");
  if (overwrite_code) {
    area.value = level.starting_code || "# Your code goes here.";
    if (!level.starting_code) {
      const levelCodeKey = `code_${level_num}`;
      const alreadyWrittenCode = localStorage.getItem(levelCodeKey);
      if (alreadyWrittenCode) {
        area.value = alreadyWrittenCode;
      }
    }
  }
  // Make a copy
  vehicles = JSON.parse(JSON.stringify(level.setup));
  blocked = new Array(ROWS_COLS).fill(0).map(() => new Array(ROWS_COLS).fill(null));
  const toLoad = [];
  for (const vehicle of vehicles) {
    toLoad.push(vehicle.asset);
    let r = vehicle.row;
    let c = vehicle.col;
    for (let i = 0; i < vehicle.width; i++) {
      blocked[r][c] = vehicle;
      if (vehicle.dir === "EW") {
        c++;
      } else {
        r++;
      }
    }
  }
  await loadAssets(toLoad);
  loading = false;
}

const BOX_SIZE = 170;
const Y_OFFSET = 32;
const X_OFFSET = 32;
const ROWS_COLS = 6;
let lastClicked = [0, 0, 0];
let hasCompletedLevel = false;
let loading = false;
function gameLoop() {
  requestAnimationFrame(gameLoop);
  const ctx = document.getElementById("board").getContext("2d");
  ctx.clearRect(0, 0, 1100, 1100);
  ctx.drawImage(assets["board_big"], 0, 0);
  for (let vehicle of vehicles) {
    const img = assets[vehicle.asset];
    if (img) {
      ctx.drawImage(img, 
        vehicle.col * BOX_SIZE + X_OFFSET,
        vehicle.row * BOX_SIZE + Y_OFFSET);
    }
  }
  if ((Date.now() - lastClicked[2]) < 1000) {
    ctx.lineWidth = 2;
    ctx.strokeRect(lastClicked[0] * BOX_SIZE + X_OFFSET,
    lastClicked[1] * BOX_SIZE + Y_OFFSET,
    BOX_SIZE, BOX_SIZE);
  }
  if (loading) {
    ctx.fillStyle = "#FFF";
    ctx.font = "100px serif";
    ctx.fillRect(X_OFFSET + BOX_SIZE, Y_OFFSET, 3 * BOX_SIZE, BOX_SIZE);
    ctx.fillStyle = "#000";
    ctx.fillText("loading...", X_OFFSET + BOX_SIZE*1.25, Y_OFFSET + BOX_SIZE*.75);
  } else if (hasCompletedLevel) {
    ctx.fillStyle = "#FFF";
    ctx.font = "100px serif";
    ctx.fillRect(X_OFFSET + BOX_SIZE, Y_OFFSET, 4 * BOX_SIZE, 2 * BOX_SIZE);
    ctx.fillStyle = "#000";
    ctx.fillText("Done! Code is", X_OFFSET + BOX_SIZE*1.25, Y_OFFSET + BOX_SIZE*.75);
    const levelSolutionKey = `solved_${mode}_${currentLevel}`;
    let levelCode = localStorage.getItem(levelSolutionKey);
    if (!levelCode) {
      levelCode = generateLevelCode(mode, currentLevel);
      localStorage.setItem(levelSolutionKey, levelCode);
    }
    ctx.fillText(levelCode, X_OFFSET + BOX_SIZE*1.25, Y_OFFSET + BOX_SIZE*1.75);
  }
}

function generateLevelCode(mode, levelNum) {
  // Remember levelNum 0 is Tutorial 1 and levelNum 1 is Tutorial 2
  if (levelNum < 3) {
    if (mode === 'manual') {
      return levels[levelNum].m_mode_code;
    } else {
      return levels[levelNum].p_mode_code;
    }
  }
  const length2Prefix = Math.random() > 0.5;
  let code = randomLetter();
  code += randomNumber(10);
  if (length2Prefix) {
    code += randomNumber(10);
  }
  if (mode !== 'manual') {
    code += 'P';
  }
  code += levels[levelNum].code_piece;
  if (!length2Prefix) {
    code += randomNumber(10);
  }
  if (mode === 'manual') {
    code += randomNumber(10);
  }
  return code;
}

function randomLetter() {
  return "ABCDEFGHJKLMNQRSTUVWXYZ"[randomNumber(23)];
}

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function handleBoardClick(e) {
  if (hasCompletedLevel) {
    return;
  }
  const canvas = document.getElementById("board");
  const scaledX = e.offsetX * canvas.width / canvas.offsetWidth;
  const scaledY = e.offsetY * canvas.height / canvas.offsetHeight;
  const c = Math.floor((scaledX - X_OFFSET) / BOX_SIZE);
  const r = Math.floor((scaledY - Y_OFFSET) / BOX_SIZE);
  const carClicked = blocked[r] && blocked[r][c];
  if (!carClicked) {
    lastClicked = [c, r, Date.now()];
    return;
  }
  lastClicked = [0, 0, 0];
  let dir = '';
  if (carClicked.dir === "EW") {
    if (carClicked.col === c) {
      dir = 'W';
    } else if (c === carClicked.col + carClicked.width - 1) {
      dir = 'E';
    }
  } else {
    if (carClicked.row === r) {
      dir = 'N';
    } else if (r === carClicked.row + carClicked.width - 1) {
      dir = 'S';
    }
  }
  moveIfPossible(carClicked, dir)
};

// Return true if move was good, false otherwise.
function moveIfPossible(vehicle, dir) {
  if (!dir) {
    return false; // could happen for trucks clicked in middle
  }
  if (vehicle.asset === "XCarEW" && vehicle.col === 4 && dir === 'E') {
    hasCompletedLevel = true;
    return true;
  }
  const minR = vehicle.row;
  const minC = vehicle.col;
  const maxC = vehicle.col + vehicle.width - 1;
  if (dir === 'W' && vehicle.dir === 'EW') {
    const targetCol = minC - 1;
    if (targetCol >= 0 && !blocked[minR][targetCol]) {
      blocked[minR][maxC] = null; // remove old space
      blocked[minR][targetCol] = vehicle;
      vehicle.col--;
      return true;
    }
    return false;
  }
  if (dir === 'E' && vehicle.dir === 'EW') {
    const targetCol = maxC + 1;
    if (targetCol < ROWS_COLS && !blocked[minR][targetCol]) {
      blocked[minR][minC] = null; // remove old space
      blocked[minR][targetCol] = vehicle;
      vehicle.col++;
      return true;
    }
    return false;
  }
  const maxR = vehicle.row + vehicle.width - 1;
  if (dir === 'N' && vehicle.dir === 'NS') {
    const targetRow = minR - 1;
    if (targetRow >= 0 && !blocked[targetRow][minC]) {
        blocked[maxR][minC] = null; // remove old space
        blocked[targetRow][minC] = vehicle;
        vehicle.row--;
        return true;
    }
    return false;
  }
  if (dir == 'S' && vehicle.dir === 'NS') {
    const targetRow = maxR + 1;
    if (targetRow < ROWS_COLS && !blocked[targetRow][minC]) {
        blocked[minR][minC] = null; // remove old space
        blocked[targetRow][minC] = vehicle;
        vehicle.row++;
        return true;
    }
    return false;
  }
  return false;
}

init();