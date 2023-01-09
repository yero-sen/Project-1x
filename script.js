// Define an array to store the tasks
let tasks = [];

// Define the form element
const taskForm = document.querySelector('#task-form');

// Define the sort button element
const sortButton = document.querySelector('#sort-button');

// Define the completion percentage element
const completionPercentage = document.querySelector('#completion-percentage');

// Define the task list element
const taskList = document.querySelector('#task-list');

// Define the function to add a new task
function addTask(description, dueDate, priority) {
    // Create a new task object with the provided parameters
    const task = {
        description: description,
        dueDate: dueDate,
        priority: priority,
        complete: false
    };
    // Add the task object to the tasks array
    tasks.push(task);
    // Clear the task list
    taskList.innerHTML = '';
    // Iterate over the tasks array
    for (let i = 0; i < tasks.length; i++) {
        // Create a new list item element
        const listItem = document.createElement('li');
        // Create a new checkbox input
        const checkbox = document.createElement('input');
        // Set the type of the checkbox to "checkbox"
        checkbox.type = "checkbox";
        // Set the value of the checkbox to the index of the task
        // Set the text content of the list item to the task description
        listItem.textContent = tasks[i].description;
        // Append the checkbox to the list item
        listItem.appendChild(checkbox);
        // Append the list item to the task list
        taskList.appendChild(listItem);
    }
    // Call the displayCompletionPercentage function
    displayCompletionPercentage();
}

// Define the function to sort the tasks
function sortTasks(sortBy) {
    // Sort the tasks array using the provided sortBy parameter
    tasks.sort(function (a, b) {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1;
        }
        return 0;
    });
    // Clear the task list
    taskList.innerHTML = '';
    // Iterate over the tasks array
    for (let i = 0; i < tasks.length; i++) {
        // Create a new list item element
        const listItem = document.createElement('li');
        // Create a new checkbox input
        const checkbox = document.createElement('input');
        // Set the type of the checkbox to "checkbox"
        checkbox.type = "checkbox";
        // Set the value of the checkbox to the index of the task in the array
        checkbox.value = i;
        // Set the checked state of the checkbox based on the task's complete property
        checkbox.checked = tasks[i].complete;
        // Add an event listener to the checkbox to listen for change events
        checkbox.addEventListener('change', function () {
            // Mark the task as complete or incomplete
            tasks[this.value].complete = this.checked;
            // Call the displayCompletionPercentage function
            displayCompletionPercentage();
        });
        // Set the text content of the list item to the task description
        listItem.textContent = tasks[i].description;
        // Append the checkbox to the list item
        listItem.appendChild(checkbox);
        // Append the list item to the task list
        taskList.appendChild(listItem);
    }
}

// Define the function to display the completion percentage
function displayCompletionPercentage() {
    // Initialize a count of completed tasks to 0
    let completedTaskCount = 0;
    // Iterate over the tasks array
    for (let i = 0; i < tasks.length; i++) {
        // If the task is complete, increment the completed task count
        if (tasks[i].complete) {
            completedTaskCount++;
        }
    }
    // Calculate the percentage of tasks that are complete
    const completionPercentage = (completedTaskCount / tasks.length) * 100;
    // Set the text content of the completion percentage element to the calculated percentage
    completionPercentage.textContent = `${completionPercentage}% complete`;
}

// Add an event listener to the form to listen for submit events
taskForm.addEventListener('submit', function (event) {
    // Prevent the form from refreshing the page
    event.preventDefault();
    // Get the values of the task input fields
    const taskInput = document.querySelector('#task-input');
    const dueDateInput = document.querySelector('#due-date-input');
    const priorityInput = document.querySelector('#priority-input');
    const description = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    // Call the addTask function with the task inputs as arguments
    addTask(description, dueDate, priority);
    // Clear the values of the task input fields
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = '';
});

// Add an event listener to the sort button to listen for click events
sortButton.addEventListener('click', function () {
    // Prompt the user to enter a sort criteria
    const sortBy = prompt('Enter a criteria to sort by (description, dueDate, priority)');
    // Call the sortTasks function with the sortBy value as an argument
    sortTasks(sortBy);
});