// ? Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// ~? Selectors

// ! event listener
todoBtn.addEventListener("click", addTodo);
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
  } else {
    newListItem.innerText = `Empty Input ${todoList.children.length + 1}`;
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
// ~@ functions