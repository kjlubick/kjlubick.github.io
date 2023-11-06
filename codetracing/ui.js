const codeBox = document.getElementById("code_box");
const traceTable = document.getElementById("trace_box");
let questionNum = 0;

function deleteAllChildren(ele) {
  ele.innerHTML = '';
}

function renderCode() {
  deleteAllChildren(codeBox);
  deleteAllChildren(traceTable);
  const q = questions[questionNum];
  const codeLines = q.code.split('\n');
  for (const i in codeLines) {
    const line = codeLines[i];
    const div = document.createElement("div");
    const space = i < 9 ? '&nbsp;' : '';
    div.innerHTML = `
  <div>
    <span class="line_num">${space}${+i+1}</span>
    <pre class="code_line">${line}</pre>
  </div>`;  
    codeBox.appendChild(div);
  }

  const thead = document.createElement("thead");
  let tr = document.createElement("tr");
  tr.innerHTML = `<th class=fixed_header>step</th>`;
  if (q.answer.line) {
      tr.innerHTML += `<th class=fixed_header>line</th>`;
  }
  for (let c = 0; c < q.vars; c++) {
    const th = document.createElement("th");
    th.setAttribute("contenteditable", "");
    th.setAttribute("data-row", 0);
    th.setAttribute("data-col", c+1);
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  traceTable.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (let r = 0; r < q.max_steps; r++) {
    tr = document.createElement("tr");
    tr.innerHTML = `<th>${r+1}</th>`;
    for (let c = 0; c < q.total_cols; c++) {
      const td = document.createElement("td");
      td.setAttribute("contenteditable", "");
      td.setAttribute("data-row", r+1);
      td.setAttribute("data-col", c+1);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  traceTable.appendChild(tbody);
}

document.getElementById("reset_btn").addEventListener("click", () => {
  resetAnswers();
  saveAndGrade();
});

// On edit, we reset the class
document.getElementById("trace_box").addEventListener("input", (e) => {
  saveAndGrade();
});

function loadPreviousGuesses() {
  const levelCodeKey = `traces_${questionNum}`;
  const s = localStorage.getItem(levelCodeKey);
  if (!s) {
    return;
  }
  const responses = JSON.parse(s);
  for (let r = 0; r < responses.length; r++) {
    // 1 to skip the step
    for (let c = 1; c < responses.length; c++) {
      const content = responses[r][c];
      if (!content) {continue}
      setValue(r, c, content);
    }
  }
}

function resetAnswers() {
  const q = questions[questionNum];
  for (let r = 0; r < q.max_steps+1; r++) {
    // 1 to skip the step
    for (let c = 1; c < q.total_cols+1; c++) {
      setValue(r, c, '');
      setClass(r, c, '');
    }
  }
}

function getCell(r, c) {
  const rows = document.querySelectorAll("table#trace_box tr");
  return rows[r].children[c];
}

function getResponses() {
  const table = document.getElementById("trace_box");
  const responses = [];
  for (const section of table.children) {
    for (const row of section.children) {
      const r = [];
      for (const cell of row.children) {
        r.push(cell.textContent);
      }
      responses.push(r);
    }
  }
  return responses;
}

function saveAndGrade() {
  const responses = getResponses();
  const levelCodeKey = `traces_${questionNum}`;
  localStorage.setItem(levelCodeKey, JSON.stringify(responses));
  gradeResponses(responses);
}

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const row = +event.target.dataset['row'];
    const col = +event.target.dataset['col'];
    const rows = document.querySelectorAll(`table#trace_box tr`);
    // row+1 to go to the next row.
    const newFocus = getCell((row + 1) % rows.length, col);
    newFocus.focus();
  }
});

function displayLevel(num) {
  questionNum = num;
  document.getElementById("levels").selectedIndex = num;
  document.getElementById("assumption").textContent = questions[num].assumption || "";
  renderCode();
  loadPreviousGuesses();
  gradeResponses(getResponses());
  location.hash = `#L${num}`;
}
