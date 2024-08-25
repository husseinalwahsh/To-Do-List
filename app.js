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
  getTaskStatus() {
    return this.#taskPriority;
  }
}

class ToDoList {
  constructor() {
    this.tasks = [];
  }
  addTask(taskName, taskPriority) {
    const newTask = new TaskItem(taskName, taskPriority);
    this.tasks.push(newTask);
    console.log(this.tasks);
    this.renderList();
    taskNameElement.value = "";
    this.setTaskPriority();
  }
  renderList() {
    const tasksListElement = document.getElementById("tasksList");
    tasksListElement.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      const todoItemElement = document.createElement("li");
      const taskNameItem = document.createElement("p");
      const deleteTaskButton = document.createElement("button");
      const checkboxElement = document.createElement("input");
      checkboxElement.type = "checkbox";
      deleteTaskButton.id = "delete";
      deleteTaskButton.textContent = "Delete";
      deleteTaskButton.onclick = () => {
        this.deleteTask(i);
      };
      todoItemElement.appendChild(taskNameItem);
      todoItemElement.appendChild(checkboxElement);
      todoItemElement.appendChild(deleteTaskButton);
      taskNameItem.textContent = `${this.tasks[i].getNameTask()}`;

      tasksListElement.appendChild(todoItemElement);
      checkboxElement.addEventListener("change", (event) => {
        const todoItemElement = document.querySelectorAll("li")[i];
        //  todoItemElement.style.textDecoration="underline";
        if (event.target.checked) {
          todoItemElement.classList.add("complete");
        } else {
          todoItemElement.classList.remove("complete");
        }
      });
      todoItemElement.classList.add(this.tasks[i].getTaskStatus());
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

addListElement.onclick = () => {
  const taskName = taskNameElement.value;
  const taskPriority = taskPriorityElement.value;
  if (taskName !== "") {
    toDoList.addTask(taskName, taskPriority);
  } else {
    alert("Please enter a task name.");
  }
};
