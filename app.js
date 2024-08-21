class taskItem {
  #taskName;

  constructor(taskName) {
    this.#taskName = taskName;
  }
  getNameTask() {
    return this.#taskName;
  }
}

//Vareble in this code
const addListElement = document.getElementById("addList");
const taskNameElement = document.getElementById("taskName");
const taskPriorityElement = document.getElementById("priority");
const tasks = [];
const tasksListElement = document.getElementById("tasksList");

addListElement.addEventListener("click", () => {
  if (taskNameElement.value !== "") {
    let newTask = new taskItem(taskNameElement.value);
    tasks.push(newTask);
    console.log(tasks);
    renderList();
    taskNameElement.value = "";
  }
});

const renderList = () => {
  tasksListElement.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const todoItemElement = document.createElement("li");
    const taskNameItem = document.createElement("p");
    todoItemElement.appendChild(taskNameItem);
    taskNameItem.textContent = `${tasks[i].getNameTask()}`;
    tasksListElement.appendChild(todoItemElement);
  }
  console.log(tasksListElement);
};
