"use strict";
let newTask = document.querySelector(".todo-list .task .name-task input"), addTask = document.querySelector(".todo-list .task .add-task input"), task = document.querySelector(".todo-list"), removeAllTasks = document.querySelector(".todo-list .task .remove-tasks"), removeAllTasksButton = document.querySelector(".todo-list .task .remove-tasks input");
// Array to push tasks
let arrayOfTasks = [];
// Check if the tasks in the localStorage
if (localStorage.getItem("tasks"))
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
// Function to get data [Tasks] from localStorage
function getArrayOfTasksFromLocalStorage() {
    // Get data [Tasks] from localStorage
    let getTasks = window.localStorage.getItem("tasks");
    // Check if there're data [Tasks] in the localStorage
    if (getTasks) {
        // Convert the data [Tasks] from string to object
        let tasks = JSON.parse(getTasks);
        // Print all data [Tasks] to the page
        tasks.forEach((theTask) => {
            addElementsToPage(theTask.task, theTask.complete);
        });
    }
}
getArrayOfTasksFromLocalStorage();
// Function to add all data [Tasks] to the array
function AddArrayOfTasks(newTask) {
    // Obejct of data [Tasks]
    let tasks = {
        task: newTask,
        complete: false,
    };
    // Push the data [Tasks] to the array
    arrayOfTasks.push(tasks);
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}
// Function to add the data [Tasks] to localStorage
function AddArrayOfTasksToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// Add task after clicking
addTask.addEventListener("click", () => {
    // Means there's a task
    if (newTask.value != "") {
        AddArrayOfTasks(newTask.value);
        addElementsToPage(newTask.value);
        ToggleAddButton(newTask.value);
        ToggleRemoveAllButton();
        // Empty input filed of task
        newTask.value = "";
        newTask.focus();
    }
});
// Function to add data [Tasks] in the page
function addElementsToPage(newTask, taskDone) {
    // Create all Divs
    let contentDiv = document.createElement("div");
    let contentTaskDiv = document.createElement("div");
    let removeTaskDiv = document.createElement("div");
    // Create content of task
    let content = document.createElement("p");
    // Create remove task input
    let removeTask = document.createElement("input");
    // Set attributes
    removeTask.setAttribute("type", "button");
    removeTask.setAttribute("value", "Remove");
    // Add classes
    contentDiv.className = "content";
    contentTaskDiv.className = "content-task";
    removeTaskDiv.className = "remove-task";
    removeTask.className = "del";
    content.className = "not-done";
    // Check if the task is done
    if (taskDone) {
        arrayOfTasks.forEach((task) => {
            // Means if it's true
            if (task.complete) {
                // Task is Done
                content.className = "";
            }
        });
    }
    // Add all Divs on DOM
    content.innerHTML = newTask;
    contentTaskDiv.append(content);
    contentDiv.append(contentTaskDiv);
    removeTaskDiv.append(removeTask);
    contentDiv.append(removeTaskDiv);
    task.append(contentDiv);
}
// Function to remove a specific task from the page
function RemoveTask() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
            e.target.parentElement.parentElement.remove();
            RemoveSpecificTaskFromLocalStorage(e.target.parentElement.parentElement.children[0].textContent);
        }
        ToggleRemoveAllButton();
    });
}
RemoveTask();
// Function to remove all tasks from the page
function RemoveAllTasks() {
    removeAllTasks.addEventListener("click", () => {
        let allTasks = document.querySelectorAll(".todo-list .content");
        allTasks.forEach((task) => {
            task.remove();
        });
        ToggleRemoveAllButton();
        RemoveAllTasksFromLocalStorage();
        arrayOfTasks = [];
    });
}
RemoveAllTasks();
/*
    function to toggle add button
    - If write any thing, u can press add button
    - If don't write any thing, u can't press add button
*/
function ToggleAddButton(task) {
    // Disable add button after add a new task
    if (task)
        addTask.classList.add("active");
    newTask.addEventListener("input", () => {
        if (newTask.value.length > 0) {
            addTask.classList.remove("active");
        }
        else {
            addTask.classList.add("active");
        }
    });
}
ToggleAddButton();
// Function to toggle button [Remove All]
function ToggleRemoveAllButton() {
    let allTasks = document.querySelectorAll(".todo-list .content");
    if (allTasks.length > 0) {
        removeAllTasksButton.classList.remove("active");
    }
    else {
        removeAllTasksButton.classList.add("active");
    }
}
ToggleRemoveAllButton();
// Fucntion to toggle task [if it's done or not]
function ToggleTaskDone() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("not-done")) {
            e.target.classList.remove("not-done");
            UpdateLocalStorage(e.target);
        }
        else {
            e.target.classList.add("not-done");
            UpdateLocalStorage(e.target);
        }
    });
}
ToggleTaskDone();
// Function to update the data [Tasks] from localStorage if the task is done or not
function UpdateLocalStorage(taskDone) {
    arrayOfTasks.forEach((theTask) => {
        if (theTask.task == taskDone.textContent)
            theTask.complete == false ? theTask.complete = true : theTask.complete = false;
    });
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}
// Function to remove a specific data [Tasks] from localStorage
function RemoveSpecificTaskFromLocalStorage(specificTask) {
    arrayOfTasks = arrayOfTasks.filter((theTask) => theTask.task != specificTask);
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}
// Function to remove all data [Tasks] from localStorage
function RemoveAllTasksFromLocalStorage() {
    window.localStorage.removeItem("tasks");
}
