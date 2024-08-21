class TodoITask {
  #nameTask;
  #statusTask;
  #completeTask;
  constructor(nameTask, statusTask) {
    this.#nameTask = nameTask;
    this.#statusTask = statusTask;
    this.#completeTask = false;
  }
  getNameTask() {
    return this.#nameTask;
  }
}

//Vareble in this code
let addList = document.getElementById("addList");
let taskValue = document.getElementById("taskValue");
let priority = document.getElementById("priority");
let tasks = [];
let ul = document.getElementById("ul");

addList.addEventListener("click", () => {
  if (taskValue.value !== "") {
    let newTask = new TodoITask(taskValue.value, priority.value);
    tasks.push(newTask);
    console.log(tasks)
    renderList()
  }

});


const renderList = () => {
  ul.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {

    const todoItemElement = document.createElement("li");
    const taskNameItem = document.createElement("p");
    todoItemElement.appendChild(taskNameItem);
    taskNameItem.textContent = `${tasks[i].getNameTask()}`
    ul.appendChild(todoItemElement);


  }
  console.log(ul)
}

