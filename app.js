class TaskItem {
  #taskName;
  #taskPriority;
  #isTasksComplete;
  constructor(taskName, taskPriority) {
    this.#taskName = taskName;
    this.#taskPriority = taskPriority;
    this.#isTasksComplete = false;
  }
  getNameTask() {
    return this.#taskName;
  }
  getTaskPriority() {
    return this.#taskPriority;
  }
  getIsTasksComplete() {
    return this.#isTasksComplete;
  }
  setIsTasksComplete() {
    return true;
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
      checkboxElement.value = this.tasks[i].getIsTasksComplete();
      tasksListElement.appendChild(todoItemElement);
      checkboxElement.addEventListener("change", () => {
        const todoItemElement = document.querySelectorAll("li")[i];
        //  todoItemElement.style.textDecoration="underline";
        if (checkboxElement.value === "false") {
          checkboxElement.value = this.tasks[i].setIsTasksComplete();
          todoItemElement.style.background = "rgb(30, 255, 0)";
        } else {
          console.log(true);
          checkboxElement.value = this.tasks[i].getIsTasksComplete();
          todoItemElement.style.background = "";
        }
      });
    }
  }
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderList();
  }
  setTaskPriority() {
    for (let i = 0; i < this.tasks.length; i++) {
      const todoItemElement = document.querySelectorAll("li")[i];
      if (this.tasks[i].getTaskPriority() === "high") {
        todoItemElement.classList.add("high");
      } else if (this.tasks[i].getTaskPriority() === "medium") {
        todoItemElement.classList.add("medium");
      } else {
        todoItemElement.classList.add("low");
      }
    }
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
