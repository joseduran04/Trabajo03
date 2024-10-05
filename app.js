const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = newTaskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    newTaskInput.value = "";
  } else {
    alert("Por favor, ingresa una tarea.");
  }
});

function addTask(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", removeTask);

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function removeTask(e) {
  const taskItem = e.target.parentElement;
  taskList.removeChild(taskItem);
}

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
  }
});

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(function (taskItem) {
    tasks.push({
      text: taskItem.textContent.replace("Eliminar", "").trim(),
      completed: taskItem.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach(function (task) {
      addTask(task.text);
      if (task.completed) {
        const li = taskList.lastChild;
        li.classList.add("completed");
      }
    });
  }
}

taskForm.addEventListener("submit", saveTasks);
taskList.addEventListener("click", saveTasks);
window.addEventListener("load", loadTasks);
