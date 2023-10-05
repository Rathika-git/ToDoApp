document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function createTaskElement(taskText, completed) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
            <label>${taskText}</label>
            <button class="delete-button">Delete</button>
        `;
        return listItem;
    }

    // Load tasks from local storage and render
    storedTasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter an item name.");
            return;
        }
        if (taskText !== "")
        {
            const task = { text: taskText, completed: false };
            storedTasks.push(task);
            saveTasks();
            const listItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(listItem);
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        const listItem = event.target.parentElement;
        if (event.target.classList.contains("delete-button")) {
            // Delete task
            const taskIndex = [...taskList.children].indexOf(listItem);
            storedTasks.splice(taskIndex, 1);
            saveTasks();
            listItem.remove();
        } else if (event.target.classList.contains("task-checkbox")) {
            // Task completion
            const taskIndex = [...taskList.children].indexOf(listItem);
            storedTasks[taskIndex].completed = event.target.checked;
            saveTasks();
            listItem.classList.toggle("completed", event.target.checked);
        }
    });
});