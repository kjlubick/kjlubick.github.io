const STEP_DELAY = 600;

function debugLog(msg) {
  console.debug ? console.debug(msg): console.log(msg);
}

function attemptToRunCode(code) {
  const levelCodeKey = `code_${currentLevel}`;
  localStorage.setItem(levelCodeKey, code);
  // we shouldn't need to await here because the images should
  // be loaded already
  setupLevel(currentLevel, false);
  showErrorMessage("");
  removeExecutingHighlights();
  instructionCounter = 0;
  code = code.replaceAll("#", "//");
  let compiled;
  try {
    compiled = new Function('move_right', 'move_left',
    'move_up', 'move_down', code);
  } catch (e) {
    debugLog(e);
    // JS couldn't turn this into valid code. Acorn will give us
    // a better error message:
    try {
      acorn.Parser.parse(code, {ecmaVersion: 2015});
    } catch (se) {
      showErrorMessage(`On or around line ${se.loc.line}, there is a ${se.name}. "${se.message}"`);
    }
    return;
  }
  startAnimation();
  try {
    compiled(moveRight, moveLeft, moveUp, moveDown);
  } catch (e) {
    // At this point, there was an error while running. We'll run the valid
    // instructions we have and then show the error.
    console.warn(e);
    queuedMoves.push({
      "instruction": instructionCounter,
      "error": e.message,
    })
  }
}

// instructionCounter keeps track of which move* we
// are on as a way to highlight that in the code
// 
let instructionCounter = 0;

function moveRight(letter, n) {
  _move(letter, n, "E", "right");
}

function moveLeft(letter, n) {
  _move(letter, n, "W", "left");
}

function moveUp(letter, n) {
  _move(letter, n, "N", "up");
}

function moveDown(letter, n) {
  _move(letter, n, "S", "down");
}

function _move(letter, n, dir, msg) {
  instructionCounter++;
  if (!(typeof letter === "string") || letter.length !== 1) {
    throw new Error(`Invalid vehicle identifier "${letter}"`);
  }
  for (let i = 0; i < n; i++) {
    queuedMoves.push({
      "instruction": instructionCounter,
      "letter": letter,
      "direction": dir,
      "msg": msg,
    });
  }
}

function vehicleByLetter(letter) {
  if (!(typeof letter === "string") || letter.length !== 1) {
    throw `Invalid vehicle identifier "${letter}"`;
  }
  if (letter === letter.toLowerCase()) {
    throw `Vehicle identifiers must be upper case letters.`;
  }
  for (const v of vehicles) {
    if (v.asset.startsWith(letter)) {
      return v;
    }
  }
  throw `Vehicle "${letter}" not on board.`;
}

let queuedMoves = [];
function startAnimation() {
  setTimeout(animationStep, STEP_DELAY);
}

function animationStep() {
  const move = queuedMoves.shift();
  if (!move) {
    removeExecutingHighlights();
    console.log('instructions done');
    if (!hasCompletedLevel) {
      showErrorMessage("After running all the commands, the red X car is not yet out of traffic.");
    }
    return;
  }
  const line = highlightLineWithInstruction(move.instruction);
  if (move.error) {
    showErrorMessage(`On or after line ${line}, there was an error "${move.error}". Be sure you have your instructions spelled correctly.`);
    return
  }
  try {
    const v = vehicleByLetter(move.letter);
    if (!moveIfPossible(v, move.direction)) {
      throw `Vehicle "${move.letter}" made an invalid move ${move.msg}`;
    }
    if (hasCompletedLevel) {
      queuedMoves = [];
      return;
    }
  } catch (e) {
    showErrorMessage(`On or after line ${line}, there was an error: ${e}`);
    queuedMoves = [];
    return;
  }
  setTimeout(animationStep, STEP_DELAY);
}

function findLineWithInstruction(ins) {
  const lines = document.getElementById("input_code").value.split("\n");
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^\s*move_/)) {
      count++;
      if (count === ins) {
        return i;
      }
    }
  }
  // Default to last instruction
  return count;
}

function removeExecutingHighlights() {
  const alreadyHighlighted = document.querySelectorAll("#editor .executing");
  for (let i = 0; i < alreadyHighlighted.length; i++) {
    alreadyHighlighted[i].classList.remove("executing");
  }
}
function highlightLineWithInstruction(ins) {
  const line = findLineWithInstruction(ins);
  removeExecutingHighlights();
  if (line < 0) {
    return -1;
  }
  const toHighlight = document.querySelector(`#editor .numbers > div:nth-child(${line + 1})`);
  toHighlight.classList.add("executing");
  return line + 1;
}