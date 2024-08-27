class TaskItem {
  #taskName;
  #taskPriority;
  constructor(taskName, taskPriority) {
    this.#taskName = taskName;
    this.#taskPriority = taskPriority;
  }
  getNameTask() {
    return this.#taskName;
  }
  getTaskPriority() {
    return this.#taskPriority;
  }
  setNameTask(taskName) {
    this.#taskName = taskName;
  }
}

class ToDoList {
  constructor() {
    this.tasks = [];
    this.currentFilter = "all";
  }

  addTask(taskName, taskPriority) {
    const newTask = new TaskItem(taskName, taskPriority);

    this.tasks.push(newTask);

    this.renderList();
    taskNameElement.value = "";
  }
  renderList() {
    const tasksListElement = document.getElementById("tasksList");
    tasksListElement.innerHTML = "";

    for (let i = 0; i < this.tasks.length; i++) {
      if (
        this.currentFilter === "all" ||
        this.tasks[i].getTaskPriority() === this.currentFilter
      ) {
        const todoItemElement = document.createElement("li");
        const divElement = document.createElement("div");
        const taskNameItem = document.createElement("p");
        const deleteTaskButton = document.createElement("button");
        const editTaskButton = document.createElement("button");
        const saveTaskButton = document.createElement("button");
        const checkboxElement = document.createElement("input");
        taskNameItem.contenteditable = "true";
        saveTaskButton.textContent = "Save";
        checkboxElement.type = "checkbox";
        deleteTaskButton.id = "delete";
        editTaskButton.textContent = "Edit";
        deleteTaskButton.textContent = "Delete";
        deleteTaskButton.onclick = () => {
          this.deleteTask(i);
        };
        saveTaskButton.classList.add("r");
        todoItemElement.appendChild(taskNameItem);
        todoItemElement.appendChild(checkboxElement);
        divElement.appendChild(deleteTaskButton);
        divElement.appendChild(saveTaskButton);
        divElement.appendChild(editTaskButton);
        todoItemElement.appendChild(divElement);
        taskNameItem.textContent = `${this.tasks[i].getNameTask()}`;

        tasksListElement.appendChild(todoItemElement);
        checkboxElement.addEventListener("change", (event) => {
          const todoItemElement = document.querySelectorAll("li")[i];

          if (event.target.checked) {
            todoItemElement.classList.add("complete");
          } else {
            todoItemElement.classList.remove("complete");
          }
        });
        todoItemElement.classList.add(this.tasks[i].getTaskPriority());
        editTaskButton.onclick = () => {
          editTaskButton.classList.add("r");
          saveTaskButton.classList.remove("r");
          taskNameItem.contentEditable = "true";
          taskNameItem.focus();
        };

        saveTaskButton.addEventListener("click", () => {
          taskNameItem.contentEditable = "false";
          this.tasks[i].setNameTask(taskNameItem.textContent);
          this.renderList();
        });
      }
    }
  }
  deleteTask(index) {
    this.tasks.splice(index, 1);

    this.renderList();
  }
}

//Vareble in this code
const addListElement = document.getElementById("addList");
const taskNameElement = document.getElementById("taskName");
const taskPriorityElement = document.getElementById("priority");
const toDoList = new ToDoList();
const filterSelectElement = document.getElementById("filterByPriority");
addListElement.onclick = () => {
  const taskName = taskNameElement.value;
  const taskPriority = taskPriorityElement.value;
  if (taskName !== "") {
    toDoList.addTask(taskName, taskPriority);
  } else {
    alert("Please enter a task name.");
  }
};

filterSelectElement.addEventListener("change", (event) => {
  toDoList.currentFilter = event.target.value;
  toDoList.renderList();
});
