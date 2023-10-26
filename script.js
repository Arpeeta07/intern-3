document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to create a new task
    function createTask(taskText, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${completed ? 'completed' : ''}">${taskText}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="complete">${completed ? 'Uncomplete' : 'Complete'}</button>
        `;
        li.querySelector(".delete").addEventListener("click", function() {
            tasks.splice(tasks.indexOf(taskText), 1);
            updateLocalStorage();
            li.remove();
        });
        li.querySelector(".edit").addEventListener("click", function() {
            const newText = prompt("Edit task:", taskText);
            if (newText !== null) {
                taskText = newText;
                li.querySelector("span").textContent = newText;
                tasks[tasks.indexOf(taskText)] = newText;
                updateLocalStorage();
            }
        });
        li.querySelector(".complete").addEventListener("click", function() {
            completed = !completed;
            li.querySelector("span").classList.toggle("completed");
            li.querySelector(".complete").textContent = completed ? 'Uncomplete' : 'Complete';
            tasks[tasks.indexOf(taskText)] = taskText;
            updateLocalStorage();
        });
        taskList.appendChild(li);
    }

    // Load tasks from local storage and create list items
    tasks.forEach(taskText => createTask(taskText));

    // Add a new task
    addTaskButton.addEventListener("click", function() {
        const newTaskText = taskInput.value.trim();
        if (newTaskText === "") return;
        taskInput.value = "";
        tasks.push(newTaskText);
        updateLocalStorage();
        createTask(newTaskText);
    });
});
