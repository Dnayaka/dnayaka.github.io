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
        }, timeDifference);
    }

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
}

function showNotification(taskName, deadline) {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupTaskName = document.getElementById('popup-task-name');
    const popupDeadline = document.getElementById('popup-deadline');

    popupTaskName.textContent = `Task "${taskName}" deadline is over!`;
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
