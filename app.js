// ? Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// ~? Selectors

// ! event listener
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", fetchItemFromStorage);
//~! event listener

// # functions
function addTodo(event) {
  event.preventDefault();
  const newListDivision = document.createElement("div");
  newListDivision.classList.add("todo-div");
  const newListItem = document.createElement("li");
  const itemDelBtn = document.createElement("button");
  const itemCheckbox = document.createElement("button");
  newListItem.classList.add("list-item");
  if (todoInput.value !== "") {
    newListItem.innerText = todoInput.value;
    localStorageAddItem(todoInput.value);
  } else {
    newListItem.innerText = `Empty Input ${todoList.children.length + 1}`;
  }
  todoInput.value = "";
  newListDivision.appendChild(newListItem);

  // // create checkbox
  itemCheckbox.classList.add("list-check-btn");
  itemCheckbox.innerHTML = '<i class="fas fa-square enactive"></i>';
  newListDivision.appendChild(itemCheckbox);

  // ? create close button
  itemDelBtn.classList.add("list-del-btn");
  itemDelBtn.innerHTML = '<i class="fas fa-trash"></i>';
  newListDivision.appendChild(itemDelBtn);

  todoList.appendChild(newListDivision);
}
function deletecheck(event) {
  const item = event.target;
  console.log(item);
  const parentDiv = item.parentElement;
  switch (item.classList[0]) {
    case "list-del-btn":
      parentDiv.classList.add("fall");
      parentDiv.addEventListener("transitionend", function () {
        localStorageRemoveItem(parentDiv);
        parentDiv.remove();
      });
      break;
    case "list-check-btn":
      if (item.children[0].classList[2] === "enactive") {
        parentDiv.classList.toggle("done");
        item.children[0].remove();
        item.innerHTML = `<i class="fas fa-check-square active"></i>`;
      } else if (item.children[0].classList[2] === "active") {
        parentDiv.classList.toggle("done");
        item.children[0].remove();
        item.innerHTML = `<i class="fas fa-square enactive"></i>`;
      }
      break;
  }
}
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    switch (event.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("done")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("done")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}
function localStorageCheck() {
  let localTodos;
  if (localStorage.getItem("localTodos") === null) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem("localTodos"));
  }
  return localTodos;
}
function localStorageAddItem(value) {
  let todos = localStorageCheck();
  todos.push(value.toLowerCase());
  localStorage.setItem("localTodos", JSON.stringify(todos));
}
function localStorageRemoveItem(item) {
  const todos = localStorageCheck();
  const itemValue = item.children[0].innerText.toLowerCase();
  const index = todos.indexOf(itemValue);
  todos.splice(index, 1);
  if (todos.length === 0) {
    localStorage.removeItem("localTodos");
  } else {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }
}
function fetchItemFromStorage() {
  let todos = localStorageCheck();
  for (const todo of todos) {
    const newListDivision = document.createElement("div");
    const newListItem = document.createElement("li");
    const itemDelBtn = document.createElement("button");
    const itemCheckbox = document.createElement("button");

    newListDivision.classList.add("todo-div");
    newListItem.classList.add("list-item");
    itemCheckbox.classList.add("list-check-btn");
    itemDelBtn.classList.add("list-del-btn");

    newListItem.innerText = todo;
    itemCheckbox.innerHTML = '<i class="fas fa-square enactive"></i>';
    itemDelBtn.innerHTML = '<i class="fas fa-trash"></i>';

    newListDivision.appendChild(newListItem);
    newListDivision.appendChild(itemCheckbox);
    newListDivision.appendChild(itemDelBtn);
    todoList.appendChild(newListDivision);
  }
}
// ~# functions
