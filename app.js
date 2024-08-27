class TaskItem {
  #taskName;
  #taskPriority;
  #isCompleted;

  constructor(taskName, taskPriority, isCompleted = false) {
    this.#taskName = taskName;
    this.#taskPriority = taskPriority;
    this.#isCompleted = isCompleted;
  }

  getNameTask() {
    return this.#taskName;
  }

  getTaskPriority() {
    return this.#taskPriority;
  }

  isCompleted() {
    return this.#isCompleted;
  }

  setNameTask(taskName) {
    this.#taskName = taskName;
  }

  setCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }
}

class ToDoList {
  constructor() {
    this.tasks = this.getTasksFromLocalStorage() || [];
    this.currentFilter = "all";
    this.renderList();
  }

  addTask(taskName, taskPriority) {
    const newTask = new TaskItem(taskName, taskPriority);

    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
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
        saveTaskButton.classList.add("displyButton");
        todoItemElement.appendChild(taskNameItem);
        todoItemElement.appendChild(checkboxElement);
        divElement.appendChild(deleteTaskButton);
        divElement.appendChild(saveTaskButton);
        divElement.appendChild(editTaskButton);
        todoItemElement.appendChild(divElement);
        taskNameItem.textContent = `${this.tasks[i].getNameTask()}`;

        checkboxElement.checked = this.tasks[i].isCompleted();
        todoItemElement.classList.add(this.tasks[i].getTaskPriority());
        checkboxElement.addEventListener("change", (event) => {
          const isCompleted = event.target.checked;
          this.tasks[i].setCompleted(isCompleted);
          this.saveTasksToLocalStorage();
          todoItemElement.classList.toggle("complete", isCompleted);
        });

        editTaskButton.onclick = () => {
          editTaskButton.classList.add("displyButton");
          saveTaskButton.classList.remove("displyButton");
          taskNameItem.contentEditable = "true";
          taskNameItem.focus();
        };

        saveTaskButton.addEventListener("click", () => {
          taskNameItem.contentEditable = "false";
          this.tasks[i].setNameTask(taskNameItem.textContent);
          this.saveTasksToLocalStorage();
          this.renderList();
        });

        tasksListElement.appendChild(todoItemElement);
      }
    }
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    const tasksJSON = JSON.stringify(
      this.tasks.map((task) => ({
        taskName: task.getNameTask(),
        taskPriority: task.getTaskPriority(),
        isCompleted: task.isCompleted(),
      })),
    );
    localStorage.setItem("tasks", tasksJSON);
  }

  getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON) {
      try {
        const tasksArray = JSON.parse(tasksJSON);
        return tasksArray.map(
          (task) =>
            new TaskItem(task.taskName, task.taskPriority, task.isCompleted),
        );
      } catch (e) {
        console.error("Error parsing tasks from localStorage:", e);
        return [];
      }
    }
    return [];
  }
}

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
