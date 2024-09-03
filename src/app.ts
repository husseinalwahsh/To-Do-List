enum Priority {
  All="all",
  Low = "low",
  Medium = "medium",
  High = "high"
}


class TaskItem {
  private taskName: string;
  private taskPriority:Priority;
  private isTaskCompleted: boolean;

  constructor(
    taskName: string,
    taskPriority: Priority,
    isTaskCompleted: boolean = false,
  ) {
    this.taskName = taskName;
    this.taskPriority = taskPriority;
    this.isTaskCompleted = isTaskCompleted;
  }

  getNameTask() {
    return this.taskName;
  }

  getTaskPriority() {
    return this.taskPriority;
  }

  isCompleted(): boolean {
    return this.isTaskCompleted;
  }

  setNameTask(taskName: string): void {
    this.taskName = taskName;
  }

  setCompleted(isTaskCompleted: boolean) {
    this.isTaskCompleted = isTaskCompleted;
  }
}

class ToDoList {
  tasks: TaskItem[];
  currentFilter: Priority;
  constructor() {
    this.tasks = this.getTasksFromLocalStorage() || [];
    this.currentFilter = Priority.All;
    this.renderList();
  }

  addTask(taskName: string, taskPriority: Priority) {
    const newTask = new TaskItem(taskName, taskPriority);

    this.tasks.push(newTask);

    this.renderList();
    taskNameElement.value = "";
  }
  renderList() {
    const tasksListElement = document.getElementById(
      "tasksList",
    ) as HTMLUListElement;
    tasksListElement.innerHTML = "";

    for (let i = 0; i < this.tasks.length; i++) {
      if (
        this.currentFilter === "all" ||
        this.tasks[i].getTaskPriority() === this.currentFilter
      ) {
        const todoItemElement = document.createElement("li");
        const divElement = document.createElement("div");
        const taskNameItem = document.createElement(
          "p",
        ) as HTMLParagraphElement;
        const deleteTaskButton = document.createElement("button");
        const editTaskButton = document.createElement("button");
        const saveTaskButton = document.createElement("button");
        const checkboxElement = document.createElement("input");
        taskNameItem.contentEditable = "false";
        saveTaskButton.textContent = "Save";
        checkboxElement.type = "checkbox";
        deleteTaskButton.id = "delete";
        editTaskButton.textContent = "Edit";
        deleteTaskButton.textContent = "Delete";
        deleteTaskButton.onclick = () => {
          this.deleteTask(i);
        };
        saveTaskButton.classList.add("hideButton");
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
          const isTaskCompleted = (event.target as HTMLInputElement).checked;
          this.tasks[i].setCompleted(isTaskCompleted);
          this.saveTasksToLocalStorage();
          todoItemElement.classList.toggle("complete", isTaskCompleted);
        });

        editTaskButton.onclick = () => {
          editTaskButton.classList.add("hideButton");
          saveTaskButton.classList.remove("hideButton");
          taskNameItem.contentEditable = "true";
          taskNameItem.focus();
        };

        saveTaskButton.addEventListener("click", () => {
          taskNameItem.contentEditable = "true";
          this.tasks[i].setNameTask(taskNameItem.textContent);

          this.renderList();
        });

        tasksListElement.appendChild(todoItemElement);
      }
    }
    this.saveTasksToLocalStorage();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.renderList();
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

  getTasksFromLocalStorage(): TaskItem[] | null {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON) {
      try {
        const tasksArray = JSON.parse(tasksJSON);
        return tasksArray.map(
          (task: {
            taskName: string;
            taskPriority: Priority;
            isCompleted: boolean;
          }) =>
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

const addListElement = document.getElementById("addList") as HTMLButtonElement;
const taskNameElement = document.getElementById("taskName") as HTMLInputElement;
const taskPriorityElement = document.getElementById(
  "priority",
) as HTMLSelectElement;
const toDoList = new ToDoList();
const filterSelectElement = document.getElementById(
  "filterByPriority",
) as HTMLSelectElement;

addListElement.onclick = () => {
  const taskName = taskNameElement.value;
  const taskPriority = taskPriorityElement.value as Priority;
  if (taskName !== "") {
    toDoList.addTask(taskName, taskPriority);
  } else {
    alert("Please enter a task name.");
  }
};

filterSelectElement.addEventListener("change", (event) => {
  toDoList.currentFilter = (event.target as HTMLSelectElement).value as Priority;
  toDoList.renderList();
});
