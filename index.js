let id = -1; // todo id
let todos = [];

const start = document.getElementById("start");
const list = document.getElementById("todos-list");
const addForm = document.getElementById("todo-form");

//  ####################################list all exiciting todos
listTodos(todos);

// ###################################### add new todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  id += 1;
  let todo = document.getElementById("new-todo").value;
  let status = false;
  todos.push({ id, todo, status });
  console.log("todo added");
  //  upadtes the list for the user
  listTodos(todos);
});

// ##################################### delete to do
list.addEventListener("click", (e) => {
  if (e.target.className == "del-btn") {
    deleteTodo(e.target.value);
  }
});

// #################################### check completed
list.addEventListener("change", (e) => {
  if (e.target.className == "check-box") {
    checkTodo(e.target, e.target.value);
  }
  console.log("checked");
});

// function defintion

// create HTML elments to conatain todo text and buttons
function createHtmlTodo(id, todo, status) {
  let li = document.createElement("div");
  li.id = `${id}`;
  list.appendChild(li);

  let checkBox = document.createElement("input");
  checkBox.type = "checkBox";
  checkBox.classList = "check-box";
  checkBox.value = `${id}`;
  li.appendChild(checkBox);

  let todoText = document.createElement("div");
  todoText.classList = "todo-text";
  todoText.innerText = todo;
  li.appendChild(todoText);

  //  to retrieve the todo status
  if (status == true) {
    console.log("inside if condtion ");
    todoText.classList.add("completed");
    checkBox.checked = "checked";
  }

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.value = `${id}`;
  li.appendChild(editBtn);

  let delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.value = `${id}`;
  delBtn.innerText = "Delete";
  li.appendChild(delBtn);
}

// read all todos and add them to the DOM
function listTodos(todos) {
  list.innerText = "";

  for (const todo of todos) {
    createHtmlTodo(todo.id, todo.todo, todo.status);
  }
  counter(todos);
  todos.length > 0
    ? start.classList.add("hide")
    : start.classList.remove("hide");

  console.log(todos);
}

function deleteTodo(id) {
  let index = todos.findIndex((todo) => todo.id == id);
  todos.splice(index, 1);
  console.log("todo deleted " + index);
  listTodos(todos);
}

function checkTodo(checkBox, id) {
  let status = checkBox.nextSibling.classList.toggle("completed");
  console.log(status);
  console.log("hi");
  let index = todos.findIndex((todo) => todo.id == id);
  todos[index].status = status;
  console.log(todos);
  console.log("todo status updated" + index);
  listTodos(todos);
}

function counter(todos) {
  let completed = 0;
  for (todo of todos) {
    if (todo.status) {
      completed += 1;
    }
    completed, todos.length;
  }

  const counter = document.getElementById("counter");
  counter.innerText = `completed tasks: ${completed} out of ${todos.length}`;
}
