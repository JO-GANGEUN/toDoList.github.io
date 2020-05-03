const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input");
toDoList = document.querySelector(".js-toDoList");


const TODO_LS = 'toDos';

let toDos = [];


function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}



function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function(toDo){
    console.log(toDo.id,parseInt(li.id));
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDo;
  saveToDos();
}

function loadTodoDos() {
  const loadToDos = localStorage.getItem(TODO_LS);

  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    })

  }

}
function paintToDo(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "✖";
  deleteBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerHTML = text + '&nbsp;';

  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  }

  toDos.push(toDoObj);
  saveToDos();

}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadTodoDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();

