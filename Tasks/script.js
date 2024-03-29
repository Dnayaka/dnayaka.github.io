document.getElementById('task-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task');
    const deadlineInput = document.getElementById('deadline');

    if (taskInput.value === '' || deadlineInput.value === '') {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskInput.value,
        deadline: new Date(deadlineInput.value).toLocaleString()
    };

    displayTask(task);

    // Set a timeout for the task deadline
    const deadline = new Date(deadlineInput.value);
    const currentTime = new Date();
    const timeDifference = deadline - currentTime;
    if (timeDifference > 0) {
        setTimeout(() => {
            showNotification(task.name, task.deadline);
            ShowNotification();
        }, timeDifference);
    }

    // Save task to localStorage
    saveTaskToLocalStorage(task);

    taskInput.value = '';
    deadlineInput.value = '';
}

function displayTask(task) {
    const taskList = document.getElementById('task-list');

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.setAttribute('data-id', task.id); // Add data-id attribute
    taskElement.innerHTML = `
        <h3>${task.name}</h3>
        <p>Deadline: ${task.deadline}</p>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(taskElement);

    // Attach event listener to delete button
    const deleteBtn = taskElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            deleteTask(task.id);
        }
    });
}

function deleteTask(id) {
    const taskElement = document.querySelector(`.task[data-id="${id}"]`);
    taskElement.remove();
    // Remove task from localStorage
    removeTaskFromLocalStorage(id);
}

function showNotification(taskName, deadline) {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupTaskName = document.getElementById('popup-task-name');
    const popupDeadline = document.getElementById('popup-deadline');

    popupTaskName.textContent = `Task "${taskName}" Deadline was over!!`; 
    popupDeadline.textContent = `Deadline was ${deadline}`;

    overlay.style.display = 'block';
    popup.style.display = 'block';

    // Close popup when overlay is clicked
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });

    // Close popup when close button is clicked
    const closeBtn = document.getElementById('close');
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
}

function ShowNotification() {
    // Check if browser supports Notifications
    if (!("Notification" in window)) {
        alert("Your Browser not supported notification!");
    } else if (Notification.permission === "granted") {
        // If permission granted, show notification
        var notification = new Notification("Deadline", {
            icon: "islam.jpg", // Change with your notification icon path
            body: "Your Task was over!."
        });
    } else if (Notification.permission !== "denied") {
        // If permission not asked yet, ask for notification permission
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                var notification = new Notification("Deadline", {
                    icon: "islam.jpg", // Change with your notification icon path
                    body: "Your Task was over!"
                });
            }
        });
    }
}

// Function to save task to localStorage
function saveTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
