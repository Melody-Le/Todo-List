document.addEventListener("DOMContentLoaded", getTodos);
const inputTodo = document.querySelector("#new-todo");
const btnAddTodo = document.querySelector(".btn-add");
const btnAddDone = document.querySelector(".btn-completed");
const error = document.querySelector(".error");

const pendingBox = document.querySelector(".pending-container");
const doneBox = document.querySelector(".done-container");

const todoParent = document.querySelector("#todo-lists");

const addNewTodo = function () {
  if (inputTodo.value === "") {
    error.classList.remove("hidden");
    return;
  }
  const html = `<li class="pending">
  <p class="task">${inputTodo?.value}</p>
  <button class="btn-completed">Completed</button>`;
  pendingBox.insertAdjacentHTML("beforeend", html);
  saveLocalTodos(inputTodo.value);
  inputTodo.value = "";
};

const addThingsDone = function (e) {
  const doneTask = e.target.previousElementSibling;
  const currentPendngBox = e.target.closest(".pending");
  const html = `<li class="done">
    <p>${doneTask?.textContent}</p>
    <img
      class="icon-remove"
      src="./img/icon-remove-revise .png"
      alt="icon-removed"
    />
  </li>`;
  if (e.target.classList.contains("btn-completed")) {
    doneBox.insertAdjacentHTML("beforeend", html);
    currentPendngBox.remove();
  }
  if (e.target.classList.contains("icon-remove")) {
    e.target.parentNode.remove();
  }
};

const removeThingsDone = (e) => {
  console.log(e.target.parentNode);
};

inputTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTodo.value) {
    addNewTodo();
  }
});

btnAddTodo.addEventListener("click", addNewTodo);
todoParent.addEventListener("click", addThingsDone);

//NOTE:
//To store in local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//NOTE: Get Todos from local storage
function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //check if we already have completed todos
  if (localStorage.getItem("completedTodos") === null) {
    //if no create one
    completedTodos = [];
  } else {
    //if yes get them
    completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  }
  //NOTE: RE-RENDER TODO FROM LOCAL STORAGE:
  todos.forEach(function (todo) {
    if (todo === "") {
      return;
    }
    const html = `<li class="pending">
  <p class="task">${todo}</p>
  <button class="btn-completed">Completed</button>`;
    pendingBox.insertAdjacentHTML("beforeend", html);
  });
  completedTodos.forEach(function (todo) {
    const html = `<li class="done">
    <p>${todo}</p>
    <img
      class="icon-remove"
      src="./img/icon-remove-revise .png"
      alt="icon-removed"
    />
  </li>`;
    doneBox.insertAdjacentHTML("beforeend", html);
  });
}
