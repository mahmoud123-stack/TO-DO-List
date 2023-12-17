// -- -- -- TO DO List With A local Storage Project -- -- -- //.

// [- 1 -] Setting Variables.
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let TasksDiv = document.querySelector(".tasks");

// When Page Is Reloding The Array Of Tasks Wil Empty 
let ArrayOfTasks = [];

//[- 5 -]  -{F4}- Create A function to Get Data As AN Array From Local Storage.
GetDataFromLocalStorage();

if (window.localStorage.getItem("Tasks")) {
  ArrayOfTasks = JSON.parse(window.localStorage.getItem("Tasks"));
}

// ===== ## ===== ## ===== ## ===== ## =====
/* [- 2 -]  -{F1}- Create A function to add input value {Task} to an array.
-- a -- Add Click Event on Submit button
--- b -- On click => check if the input is not empty 
---- c -- add value to array 
---- d -- empty field
*/
// Step {-- a --}
submit.onclick = function () {
  // Step {-- b --}
  if (input.value !== "") {
    // step {-- c --}
    addTaskToArray(input.value);
    // step {-- d --}
    input.value = "";
    // ===== ## =====
    //[- 3 -]  -{F2}- Create A function to add array Tasks as an element to page
    addElementToPageFrom(ArrayOfTasks);
    //[- 4 -]  -{F3}- Create A function to add array To Local Storage.
    AddTaskToLocalStorageFrom(ArrayOfTasks);
  }
}

// Delete Button 
TasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    DeleteItem(e.target.parentElement.getAttribute("date-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("Update")) {
    ChangeTaskContent(e.target.parentElement.getAttribute("date-id"));
  }

  if (e.target.classList.contains("Finish")) {
    e.target.parentElement.classList.toggle("done");
    switchTheState(e.target.parentElement.getAttribute("date-id"));
  }
});

// All Functions
// [ F1 ]
function addTaskToArray(TaskContent) {
  TasksDiv.innerHTML = "";
  // Create Task
  let Task = {
    id: Date.now(),
    content: TaskContent,
    state: false,
  };
  // Add Task
  ArrayOfTasks.push(Task);
}

// [F2]
function addElementToPageFrom(ArrayOfTasks) {
  // --(a)-- Loop On Array.
  ArrayOfTasks.forEach(task => {
    // --(b)-- Create Element Called Task.
    let Task = document.createElement("div");
    //  --(c)-- Give this element a Class.
    Task.className = "Task";
    //   --(d)-- Check if the Task is finished to add class
    if (task.state) {
      Task.className = "Task done";
    }
    //    --(e)-- Add ID Attribute to the element  (=> Not Required <=).
    Task.setAttribute("Date-Id", task.id);
    //     --(f)-- Add Task content as a value to this element.
    let Content = document.createElement("div");
    Content.className = "Content";
    let TaskHeading = document.createElement("h4");
    TaskHeading.className = "TaskHeading";
    TaskHeading.appendChild(document.createTextNode(task.content));
    Content.appendChild(TaskHeading);
    Task.appendChild(Content);
    //     { --(g)-- Create buttons Delete and update }
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-circle-xmark delete";
    let UpdateIcon = document.createElement("i");
    UpdateIcon.className = "fa-solid fa-pen Update";
    let FinishIcon = document.createElement("i");
    FinishIcon.className = "fa-regular fa-circle-check Finish";
    Task.appendChild(deleteIcon);
    Task.appendChild(UpdateIcon);
    Task.appendChild(FinishIcon);
    //       --(g)-- Add Task To TasksDiv Element on the page.
    TasksDiv.appendChild(Task);
  });
}

// [F3]
function AddTaskToLocalStorageFrom(ArrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(ArrayOfTasks));
}

// [F4] 
function GetDataFromLocalStorage() {
  let Data = window.localStorage.getItem("Tasks");
  if (Data) {
    let tasks = JSON.parse(Data);
    addElementToPageFrom(tasks);
  }
}

// [F5]
function DeleteItem(TaskId) {
  ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != TaskId);
  AddTaskToLocalStorageFrom(ArrayOfTasks);
}

// [F6] 
function switchTheState(TaskId) {
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id == TaskId) {
      ArrayOfTasks[i].state == false ? (ArrayOfTasks[i].state = true) : (ArrayOfTasks[i].state = false);
    }
  }
  AddTaskToLocalStorageFrom(ArrayOfTasks);
}

// [F7]
function ChangeTaskContent(TaskId) {
  let New = prompt("What is the new Task Name ? ");
  if (New != null) {
    for (let i = 0; i < ArrayOfTasks.length; i++) {
      if (ArrayOfTasks[i].id == TaskId) {
        ArrayOfTasks[i].content = New;
      }
    }
    AddTaskToLocalStorageFrom(ArrayOfTasks);
  }
}