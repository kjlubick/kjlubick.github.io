function gradeResponses(responses) {
  resetFeedback();
  const answer = questions[questionNum].answer;
  let correct = 0;
  let variableNameFeedback = false;
  let quotesMatterFeedback = false;
  let useDashFeedback = false;
  let unnecessaryQuotesFeedback = false;
  let unnecessaryFloatFeedback = false;
  let needsFloatFeedback = false;
  let emptyStringFeedback = false;
  let variableUsedMultipleFeedback = false;
  for (let c = 0; c < responses[0].length; c++) {
    const col = responses[0][c];
    if (col === 'step') {
      continue;
    }
    if (col === '') {
      let showHelp = false;
      for (let r = 0; r < responses.length; r++) {
        setClass(r, c, '');
        if (responses[r][c]) {
          showHelp = true;
        }
      }
      if (showHelp) {
        addFeedback(`There is at least one missing variable name`)
        addFeedback(`Focus on the top row before looking at the cells beneath it.`)
      }
      continue;
    }
    if (!answer[col]) {
      setClass(0, c, "wrong");
      variableNameFeedback = true;
      continue;
    }
    let multipleTimes = false;
    for (let prevC = 0; prevC < c; prevC++) {
      if (responses[0][prevC] === col) {
        multipleTimes = true;
      }
    }
    if (multipleTimes) {
      setClass(0, c, "wrong");
      variableUsedMultipleFeedback = true;
      continue;
    }
    for (let r = 0; r < responses.length; r++) {
      if (r === 0) {
        correct++;
        setClass(r, c, "correct");
        continue;
      };
      let given = responses[r][c];
      if (given === '') {
        setClass(r, c, '');
        continue;
      }
      // Use the last specified answer if left blank.
      const expected = getAnswerOrLastDefined(answer[col], r-1);

      // Either quote is fine
      given = given.trim().replaceAll(`'`, `"`);
      if (expected.startsWith('[')) {
        given = given.replaceAll(/\s*,\s*/g, ',');
        given = given.replaceAll(/\s*\[\s*/g, '[');
        given = given.replaceAll(/\s*\]\s*/g, ']');
      }

      if (expected === given) {
        correct++;
        setClass(r, c, "correct");
      } else {
        if (startsWithQuote(expected) && !startsWithQuote(given)) {
          quotesMatterFeedback = true;
        }
        if (!startsWithQuote(expected) && startsWithQuote(given)) {
          unnecessaryQuotesFeedback = true;
        }
        if (expected.includes(".") && !given.includes(".")) {
          needsFloatFeedback = true;
        }
        if (!expected.includes(".") && given.includes(".")) {
          unnecessaryFloatFeedback = true;
        }
        if (expected === '-') {
          useDashFeedback = true;
        }
        if (expected === '""') {
          emptyStringFeedback = true;
        }
        setClass(r, c, "wrong");
      }
    }
  }

  if (variableNameFeedback) {
    addFeedback(`It looks like you have at least one wrong variable name.`);
    addFeedback(`Focus on the top row and make sure you've spelled the variables correct.`);
    addFeedback(`Uppercase vs Lowercase does matter.`);
  }
  if (quotesMatterFeedback) {
    addFeedback(`Some of these variables are strings. You should type the quotes.`);
  }
  if (unnecessaryQuotesFeedback) {
    addFeedback(`You have quotes in places where you don't need them. Only strings require quotes.`);
  }
  if (useDashFeedback) {
    addFeedback(`Use a single dash - to represent variables that haven't been initialized yet.`);
  }
  if (needsFloatFeedback) {
    addFeedback(`The difference between an integer and a float is the decimal point. You need a decimal point in at least one of the cells.`);
  }
  if (unnecessaryFloatFeedback) {
    addFeedback(`You have a float, that is, a number with a decimal point somewhere that you should not `);
  }
  if (emptyStringFeedback) {
    addFeedback("One of your cells should be the empty string. That is, open quotes, close quotes and nothing in between, not even a space.")
  }
  if (variableUsedMultipleFeedback) {
    addFeedback("You cannot use the same variable more than once in a column.")
  }

  const q = questions[questionNum];
  const expectedCorrect = (q.max_steps + 1) * q.total_cols;
  if (correct === expectedCorrect) {
    addFeedback(`You got all ${correct} boxes correct!`);
    const levelCode = getLevelCode(questionNum);
    addFeedback(`The level code is ${levelCode}`);
  } else if (correct > 0) {
    addFeedback(`Keep at it! You have ${correct}/${expectedCorrect} boxes correct.`);
  }
}

function getLevelCode(num) {
  let code = questions[questionNum].solved_code;
  if (code) {
    return code;
  }
  const levelCodeKey = `code_for_level_${num}`;
  code = localStorage.getItem(levelCodeKey);
  if (code) {
    return code;
  }
  const length2Prefix = Math.random() > 0.5;
  code = randomLetter();
  if (!length2Prefix) {
    code += randomLetter();
  }
  code += randomNumber(10);
  code += questions[questionNum].solved_piece;
  code += randomNumber(10);
  if (length2Prefix) {
    code += randomLetter();
  }
  code += randomLetter();
  localStorage.setItem(levelCodeKey, code);
  return code;
}

function randomLetter() {
  return "ABCDEFGHJKLMNQRSTUVWXYZ"[randomNumber(23)];
}

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getAnswerOrLastDefined(arr, n) {
  for (; n >= 0; n--) {
    if (arr[n] !== undefined) {
      return arr[n];
    }
  }
}

function setValue(r, c, content) {
  const cell = getCell(r, c);
  if (cell.classList.contains("fixed_header")) {
    return;
  }
  cell.textContent = content;
}

function setClass(r, c, theClass) {
  const cell = getCell(r, c);
  if (cell.classList.contains("fixed_header")) {
    return;
  }
  cell.className = theClass;
}

function resetFeedback(s) {
  const box = document.getElementById("feedback_box");
  box.innerHTML = '';
}

function addFeedback(s) {
  const box = document.getElementById("feedback_box");
  const li = document.createElement("li");
  li.innerText = s;
  box.appendChild(li);
}

function startsWithQuote(s) {
  return s[0] === `'` || s[0] === `"`;
}