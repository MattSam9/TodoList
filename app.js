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
//~! event listener

// @ functions
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
    localStorageAddItem(`Empty Input ${todoList.children.length + 1}`);
  }
  todoInput.value = "";
  newListDivision.appendChild(newListItem);

  // // create checkbox
  itemCheckbox.classList.add("list-check-btn");
  itemCheckbox.innerHTML = '<i class="fas fa-check"></i>';
  newListDivision.appendChild(itemCheckbox);

  // ? create close button
  itemDelBtn.classList.add("list-del-btn");
  itemDelBtn.innerHTML = '<i class="fas fa-trash"></i>';
  newListDivision.appendChild(itemDelBtn);

  todoList.appendChild(newListDivision);
}
function deletecheck(event) {
  const item = event.target;
  const parentDiv = item.parentElement;
  if (item.classList[0] === "list-del-btn") {
      parentDiv.classList.add("fall");
      localStorageRemoveItem(parentDiv.children[0]);
      parentDiv.addEventListener("transitionend", function () {
        parentDiv.remove();
    });
  } else if (item.classList[0] === "list-check-btn") {
    parentDiv.classList.toggle("done");
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
  todos.push(value);
  localStorage.setItem("localTodos", JSON.stringify(todos));
}
function localStorageRemoveItem(value) {
  let todos = localStorageCheck();
  let txt = value.innerText.toLowerCase();
  todos.splice(todos.indexOf(txt), 1);
  if (todos.length === 0) {
    localStorage.removeItem("localTodos");
  } else {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }
}
// ~@ functions