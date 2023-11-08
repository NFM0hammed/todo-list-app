let newTask              = <HTMLInputElement> document.querySelector(".todo-list .task .name-task input"),
    addTask              = document.querySelector(".todo-list .task .add-task input") as HTMLInputElement,
    task                 = document.querySelector(".todo-list") as HTMLElement,
    removeAllTasks       = <HTMLInputElement> document.querySelector(".todo-list .task .remove-tasks"),
    removeAllTasksButton = <HTMLInputElement> document.querySelector(".todo-list .task .remove-tasks input");

// Array to push tasks
let arrayOfTasks: object[] = [];

// Check if the tasks in the localStorage
if(localStorage.getItem("tasks")) arrayOfTasks = JSON.parse(localStorage.getItem("tasks") || "{}");

// Function to get data [Tasks] from localStorage
function getArrayOfTasksFromLocalStorage() : void {
    // Get data [Tasks] from localStorage
    let getTasks = window.localStorage.getItem("tasks");
    // Check if there're data [Tasks] in the localStorage
    if(getTasks) {
        // Convert the data [Tasks] from string to object
        let tasks = JSON.parse(getTasks);
        // Print all data [Tasks] to the page
        tasks.forEach((theTask: object) => {
            addElementsToPage((theTask as any).task, (theTask as any).complete);
        });
    }
}

getArrayOfTasksFromLocalStorage();

// Function to add all data [Tasks] to the array
function AddArrayOfTasks(newTask: string): void {
    // Obejct of data [Tasks]
    let tasks: object = {
        task: newTask,
        complete: false,
    }
    // Push the data [Tasks] to the array
    arrayOfTasks.push(tasks);
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}

// Function to add the data [Tasks] to localStorage
function AddArrayOfTasksToLocalStorage(arrayOfTasks: object) : void {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Add task after clicking
addTask.addEventListener("click", () => {
    // Means there's a task
    if(newTask.value != "") {
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
function addElementsToPage(newTask: string, taskDone?: boolean) : void {

    // Create all Divs
    let contentDiv = document.createElement("div") as HTMLElement;
    let contentTaskDiv = document.createElement("div") as HTMLElement;
    let removeTaskDiv = document.createElement("div") as HTMLElement;

    // Create content of task
    let content = document.createElement("p") as HTMLElement;
    // Create remove task input
    let removeTask = document.createElement("input") as HTMLElement;

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
    if(taskDone) {
        arrayOfTasks.forEach((task: object) => {
            // Means if it's true
           if((task as any).complete) {
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
function RemoveTask() : void {
    document.addEventListener("click", (e: any) => {
        if(e.target.classList.contains("del")) {
            e.target.parentElement.parentElement.remove();
            RemoveSpecificTaskFromLocalStorage(e.target.parentElement.parentElement.children[0].textContent);
        }
        ToggleRemoveAllButton();
    });
}

RemoveTask();

// Function to remove all tasks from the page
function RemoveAllTasks() : void {
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
function ToggleAddButton(task?: string) : void {
    // Disable add button after add a new task
    if(task) addTask.classList.add("active");
    newTask.addEventListener("input", () => {
        if(newTask.value.length > 0) {
            addTask.classList.remove("active");
        } else {
            addTask.classList.add("active");
        }
    });
}

ToggleAddButton();

// Function to toggle button [Remove All]
function ToggleRemoveAllButton() : void {
    let allTasks = document.querySelectorAll(".todo-list .content");
    if(allTasks.length > 0) {
        removeAllTasksButton.classList.remove("active");
    } else {
        removeAllTasksButton.classList.add("active");
    }
}

ToggleRemoveAllButton();

// Fucntion to toggle task [if it's done or not]
function ToggleTaskDone() : void {
    document.addEventListener("click", (e: any) => {
        if(e.target.classList.contains("not-done")) {
            e.target.classList.remove("not-done");
            UpdateLocalStorage(e.target);
        } else {
            e.target.classList.add("not-done");
            UpdateLocalStorage(e.target);
        }
    });
}

ToggleTaskDone();

// Function to update the data [Tasks] from localStorage if the task is done or not
function UpdateLocalStorage(taskDone: string) : void {
    arrayOfTasks.forEach((theTask: object) => {
        if((theTask as any).task == (taskDone as any).textContent) (theTask as any).complete == false ? (theTask as any).complete = true : (theTask as any).complete = false;
    });
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}

// Function to remove a specific data [Tasks] from localStorage
function RemoveSpecificTaskFromLocalStorage(specificTask: object) : void {
    arrayOfTasks = arrayOfTasks.filter((theTask: object) => (theTask as any).task != specificTask);
    AddArrayOfTasksToLocalStorage(arrayOfTasks);
}

// Function to remove all data [Tasks] from localStorage
function RemoveAllTasksFromLocalStorage() : void {
    window.localStorage.removeItem("tasks");
}