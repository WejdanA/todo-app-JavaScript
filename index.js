let id = -1; // todo id
let todos = [];

const todoInput = document.getElementById("new-todo");
const start = document.getElementById("start");
const list = document.getElementById("todos-list");
const addForm = document.getElementById("todo-form");
const filterMenue = document.getElementById("filter");

//  list all exiciting todos
if (localStorage.getItem("list")) {
  listlocaltodo(id);
}

//add todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  id += 1;
  let todo = todoInput.value;
  let status = false;
  if (todo && todo.trim().length > 0) {
    todos.push({ id, todo, status });
    todoInput.value = "";
    createHtmlTodo(id, todo, status, list);
    localStorage.setItem("id", id);
    localStorage.setItem("list", JSON.stringify(todos));
    counter(todos);
  } else {
    alert("please enter something");
  }
});

//edit todo
list.addEventListener("click", (e) => {
  let target = e.target;
  let todoId = target.value;
  if (target.className == "edit-btn") {
    editTodo(target, todoId);
  } else if (target.className == "save-btn") {
    saveTodo(target, todoId, todos);
  }
  localStorage.setItem("list", JSON.stringify(todos));
});

// delete todo
list.addEventListener("click", (e) => {
  let target = e.target;
  let todoId = e.target.value;
  if (target.className == "del-btn") {
    deleteTodo(todoId, todos);
    localStorage.setItem("list", JSON.stringify(todos));
    counter(todos);
  }
});

//check todo
list.addEventListener("change", (e) => {
  if (e.target.className == "check-box") {
    checkTodo(e.target, e.target.value, todos);
    localStorage.setItem("list", JSON.stringify(todos));
    counter(todos);
    let currentList = filterMenue.value;
    filterList(currentList, todos);
  }
});

// filter todo lists based on completion status
filterMenue.addEventListener("click", (e) => {
  let option = e.target.value;
  filterList(option, todos);
});
