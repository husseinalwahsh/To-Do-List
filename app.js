class taskItem {
  #taskName;

  constructor(taskName) {
    this.#taskName = taskName;
  }
  getNameTask() {
    return this.#taskName;
  }
}

class toDoList {
  constructor() {
    this.tasks = [];
  }
  addTask(taskName) {
    const newTask = new taskItem(taskName);
    this.tasks.push(newTask);
    console.log(this.tasks);
    this.renderList();
    taskNameElement.value = "";
  }
  renderList() {
    tasksListElement.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      const todoItemElement = document.createElement("li");
      const taskNameItem = document.createElement("p");
      todoItemElement.appendChild(taskNameItem);
      taskNameItem.textContent = `${this.tasks[i].getNameTask()}`;
      tasksListElement.appendChild(todoItemElement);
    }
    console.log(tasksListElement);
  }
}

//Vareble in this code
const addListElement = document.getElementById("addList");
const taskNameElement = document.getElementById("taskName");
const taskPriorityElement = document.getElementById("priority");
const newToDoList = new toDoList();
const tasksListElement = document.getElementById("tasksList");

addListElement.onclick = () => {
  const taskName = taskNameElement.value;
  if (taskName !== "") {
    newToDoList.addTask(taskName);
  } else {
    alert("Please enter a task name.");
  }
};
