// toDoList for save
const TODO_LS = "toDos";
const TODO_FS = "toFinishes";

let toDos = [];

let toFinishes = [];

const toDoForm = document.querySelector("#toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("toDoList");
const finishedList = document.getElementById("finishedList");

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function saveFinishses() {
  localStorage.setItem(TODO_FS, JSON.stringify(toFinishes));
}

function loadLists() {
  const toDos = localStorage.getItem(TODO_LS);

  if (toDos !== null) {
    const parsedToDo = JSON.parse(toDos);
    parsedToDo.forEach(item => {
      paintToDoList(item.text);
    });
  }

  const toFinishes = localStorage.getItem(TODO_FS);

  if (toFinishes !== null) {
    const parsedToFs = JSON.parse(toFinishes);
    parsedToFs.forEach(item => {
      paintFinishedList(item.text);
    });
  }
}

function paintToDoList(text) {
  // for Dispkay
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = new Date().getTime() + Math.floor(Math.random() * 100);

  span.innerHTML = text + "&nbsp;";
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const checkedBtn = document.createElement("button");
  checkedBtn.innerHTML = "✅";
  checkedBtn.addEventListener("click", moveToFinishedList);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkedBtn);
  li.id = newId;
  toDoList.appendChild(li);

  // save for load
  const item = {
    id: newId,
    text: text
  };

  toDos.push(item);
  saveToDos();
  toDoInput.value = "";
}

function moveToFinishedList(btn) {
  const li = btn.target.parentNode;
  const span = li.querySelector("span");
  // add to Finished List
  paintFinishedList(span.innerText);
  // remove to toDoList
  deleteToDoListbyLi(li);
}

function moveToDoList(btn) {
  const li = btn.target.parentNode;
  const span = li.querySelector("span");
  // add to toDo List
  paintToDoList(span.innerText);
  // remove to FinishesList
  deleteFinishesListbyLi(li);
}

function paintFinishedList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = new Date().getTime() + Math.floor(Math.random() * 100);

  span.innerHTML = text;
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToFs);
  const checkedBtn = document.createElement("button");
  checkedBtn.addEventListener("click", moveToDoList);
  checkedBtn.innerHTML = "🔙";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkedBtn);
  li.id = newId;
  finishedList.appendChild(li);

  // save for load
  const item = {
    id: newId,
    text: text
  };

  toFinishes.push(item);
  saveFinishses();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  deleteToDoListbyLi(li);
}

function deleteToFs(event) {
  const btn = event.target;
  const li = btn.parentNode;

  deleteFinishesListbyLi(li);
}

function deleteToDoListbyLi(li) {
  toDoList.removeChild(li);

  const cleanToDo = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDo;
  saveToDos();
}

function deleteFinishesListbyLi(li) {
  finishedList.removeChild(li);

  const cleanFinishes = toFinishes.filter(function(toFinishes) {
    return toFinishes.id !== parseInt(li.id);
  });

  toFinishes = cleanFinishes;
  saveFinishses();
}
function submitHandle(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDoList(currentValue);
}

function init() {
  loadLists();
  toDoForm.addEventListener("submit", submitHandle);
}

init();
