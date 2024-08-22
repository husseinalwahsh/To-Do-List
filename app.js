class TaskItem {
  #taskName;
  #taskStatus;

  constructor(taskName, taskStatus) {
    this.#taskName = taskName;
    this.#taskStatus = taskStatus;
  }
  getNameTask() {
    return this.#taskName;
  }
  getTaskStatus() {
    return this.#taskStatus;
  }
}

class ToDoList {
  constructor() {
    this.tasks = [];
  }
  addTask(taskName, taskStatus) {
    const newTask = new TaskItem(taskName, taskStatus);
    this.tasks.push(newTask);
    console.log(this.tasks);
    this.renderList();
    taskNameElement.value = "";
    this.setTaskPriority();
  }
  renderList() {
    tasksListElement.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      const todoItemElement = document.createElement("li");
      const taskNameItem = document.createElement("p");
      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.id = "delete";
      deleteTaskButton.textContent = "Delete";
      deleteTaskButton.onclick = () => {
        this.deleteTask(i);
      };
      todoItemElement.appendChild(taskNameItem);
      todoItemElement.appendChild(deleteTaskButton);
      taskNameItem.textContent = `${this.tasks[i].getNameTask()}`;
      tasksListElement.appendChild(todoItemElement);
    }
    console.log(tasksListElement);
  }
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderList();
  }
  setTaskPriority() {
    for (let i = 0; i < this.tasks.length; i++) {
      const todoItemElement = document.querySelectorAll("li")[i];
      if (this.tasks[i].getTaskStatus() === "high") {
        todoItemElement.style.background = "rgba(255, 0, 0, 0.493)";
      } else if (this.tasks[i].getTaskStatus() === "medium") {
        todoItemElement.style.background = "rgba(246, 255, 0, 0.795)";
      } else {
        todoItemElement.style.background = "rgba(30, 255, 0, 0.537)";
      }
    }
  }
}

//Vareble in this code
const addListElement = document.getElementById("addList");
const taskNameElement = document.getElementById("taskName");
const taskPriorityElement = document.getElementById("priority");
const toDoList = new ToDoList();
const tasksListElement = document.getElementById("tasksList");
addListElement.onclick = () => {
  const taskName = taskNameElement.value;
  const taskStatus = taskPriorityElement.value;
  if (taskName !== "") {
    toDoList.addTask(taskName, taskStatus);
  } else {
    alert("Please enter a task name.");
  }
};
