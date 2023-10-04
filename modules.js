// retrieve any local data
function listlocaltodo(id) {
  let localId = localStorage.getItem("id");
  id = parseInt(localId);
  let localList = localStorage.getItem("list");
  todos = JSON.parse(localList);
  listTodos(todos, list);
  counter(todos);
}

// create html elment and add them to the dom
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
  if (status) {
    todoText.classList.add("completed");
    checkBox.checked = "checked";
  }

  let editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.value = `${id}`;
  editBtn.innerText = "Edit";
  li.appendChild(editBtn);

  let delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.value = `${id}`;
  delBtn.innerText = "Delete";
  li.appendChild(delBtn);
}

// display the list to the user
function listTodos(todos, list) {
  list.innerText = "";

  for (const todo of todos) {
    createHtmlTodo(todo.id, todo.todo, todo.status, list);
  }

  todos.length > 0
    ? start.classList.add("hide")
    : start.classList.remove("hide");
}

// display the filter list  to the user
function filterList(status, todos) {
  if (status == "completed") {
    let completedList = todos.filter((todo) => todo.status);
    listTodos(completedList, list);
  } else if (status == "active") {
    let activeList = todos.filter((todo) => !todo.status);
    listTodos(activeList, list);
  } else {
    listTodos(todos, list);
  }
}

//  check completaion
function checkTodo(checkBox, id, todos) {
  let status = checkBox.nextSibling.classList.toggle("completed");
  let index = todos.findIndex((todo) => todo.id == id);
  todos[index].status = status;
}

//  edit todo
function editTodo(editBtn, todoId) {
  editBtn.innerText = "Save";
  editBtn.classList.replace("edit-btn", "save-btn");
  let todoText = editBtn.previousSibling;
  todoText.classList.add("edit-text");
  todoText.setAttribute("contenteditable", "true");
}

function saveTodo(saveBtn, todoId, todos) {
  let todoText = saveBtn.previousSibling;
  let index = todos.findIndex((todo) => todo.id == todoId);
  if (index == -1) {
    alert("There is task to be edited");
  }
  todos[index].todo = todoText.innerText;
  saveBtn.innerText = "Edit";
  saveBtn.classList.replace("save-btn", "edit-btn");
  todoText.classList.remove("edit-text");
  todoText.setAttribute("contenteditable", "false");
}

// delete todo function
function deleteTodo(todoId, todos) {
  let index = todos.findIndex((todo) => todo.id == todoId);
  if (index == -1) {
    alert("There is task to be deleted");
  }
  document.getElementById(todoId).remove();
  todos.splice(index, 1);
}

// counter
function counter(todos) {
  let completed = 0;
  for (todo of todos) {
    if (todo.status) {
      completed += 1;
    }
  }

  const counter = document.getElementById("counter");
  counter.innerText = `completed tasks: ${completed} out of ${todos.length}`;
}
