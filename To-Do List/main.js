document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.querySelector('.input');
  const dateField = document.querySelector('.schedule-date');
  const addButton = document.querySelector('.add-task-button');
  const filterButtons = document.querySelectorAll('.todos-filter li');
  const deleteAllButton = document.querySelector('.delete-all-btn');
  const todoListBody = document.querySelector('.todos-list-body');
  const alertMessage = document.querySelector('.alert-message');

  function addTask() {
      const task = inputField.value.trim();
      const dueDate = dateField.value.trim();

      if (task === '') {
          showAlert('Task cannot be empty');
          return;
      }

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${task}</td>
          <td>${dueDate}</td>
          <td>Pending</td>
          <td>
              <button class="btn btn-secondary complete-task-btn">Complete</button>
              <button class="btn btn-secondary delete-task-btn">Delete</button>
          </td>
      `;

      todoListBody.appendChild(newRow);

      inputField.value = '';
      dateField.value = '';

      showAlert('Task added successfully', 'success');
  }

  function showAlert(message, type = 'error') {
      alertMessage.textContent = message;
      if (type === 'error') {
          alertMessage.style.color = 'red';
      } else if (type === 'success') {
          alertMessage.style.color = 'green';
      }
      setTimeout(() => {
          alertMessage.textContent = '';
      }, 3000);
  }

  addButton.addEventListener('click', addTask);

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filterType = this.textContent.toLowerCase();
          const allTasks = document.querySelectorAll('.todos-list-body tr');

          allTasks.forEach(task => {
              const status = task.querySelector('td:nth-child(3)').textContent.toLowerCase();
              if (filterType === 'all') {
                  task.style.display = 'table-row';
              } else if (filterType === status) {
                  task.style.display = 'table-row';
              } else {
                  task.style.display = 'none';
              }
          });
      });
  });

  deleteAllButton.addEventListener('click', function() {
      todoListBody.innerHTML = '';
      showAlert('All tasks deleted', 'success');
  });

  todoListBody.addEventListener('click', function(e) {
      if (e.target.classList.contains('complete-task-btn')) {
          const taskRow = e.target.closest('tr');
          const statusCell = taskRow.querySelector('td:nth-child(3)');
          statusCell.textContent = 'Completed';
          e.target.remove();
          showAlert('Task completed', 'success');
      } else if (e.target.classList.contains('delete-task-btn')) {
          const taskRow = e.target.closest('tr');
          taskRow.remove();
          showAlert('Task deleted', 'success');
      }
  });
});
