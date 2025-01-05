if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js is running');
    console.log(document);
    const customerSelect = document.getElementById('customer');
    const taskSelect = document.getElementById('task');
    const saveButton = document.querySelector('.tRButtonSave');
    console.log(customerSelect);


    // Fetch customer data
    fetch('http://localhost:3000/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Customer data:', data);
        customerSelect.innerHTML = '<option value="">Vælg</option>'; // Clear existing options
        data.forEach(customer => {
          const option = document.createElement('option');
          option.value = customer.customerID; // Ensure this matches the actual property name
          option.textContent = customer.Name; // Ensure this matches the actual property name
          customerSelect.appendChild(option);
        });
      })


    // Fetch tasks based on selected customer
    customerSelect.addEventListener('change', () => {
      const customerId = customerSelect.value;
      if (!customerId) {
        taskSelect.innerHTML = '<option value="">Vælg opgave</option>'; // Clear tasks if no customer is selected
        return;
      }

      fetch(`http://localhost:3000/customers/${customerId}/task`)
        .then(response => {
          console.log('Fetch response:', response);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Task data:', data);
          taskSelect.innerHTML = '<option value="">Vælg opgave</option>'; // Clear existing options
          data.forEach(task => {
            const option = document.createElement('option');
            option.value = task.taskID; // Ensure this matches the actual property name
            option.textContent = task.Name; // Ensure this matches the actual property name
            taskSelect.appendChild(option);
          });
        })
        .catch(error => {
          console.error('Error fetching task data:', error);
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'Failed to load task data. Please try again later.';
          errorMessage.style.color = 'red';
          document.body.appendChild(errorMessage);
        });
    });

    // Save data to the database
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();

      const customerId = customerSelect.value;
      const taskId = taskSelect.value;
      const date = document.getElementById('date').value;
      const timeFrom = document.getElementById('timeFrom').value;
      const timeTo = document.getElementById('timeTo').value;
      const comment = document.getElementById('comment').value;

      if (!customerId || !taskId || !date || !timeFrom || !timeTo) {
        alert('Please fill in all fields.');
        return;
      }

      const data = {
        customerId,
        taskId,
        date,
        timeFrom,
        timeTo,
        comment
      };

      fetch('http://localhost:3000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Data saved:', data);
          alert('Data saved successfully.');
        })
        .catch(error => {
          console.error('Error saving data:', error);
          alert('Failed to save data. Please try again later.');
        });
    });
  });
}

//popup Scripts
//popupCustomer
document.addEventListener('DOMContentLoaded', function () {
  let popupCustomer = document.getElementById('idPopupCustomer');
  let popupButtonCustomer = document.getElementById('popupButtonCostumer');
  let submitButtonCustomer = document.querySelector('#idPopupCustomer .close-popup-customer-button.submit');
  let cancelButtonCustomer = document.querySelector('#idPopupCustomer .close-popup-customer-button.cancel');

  function openCustomerPopup() {
    popupCustomer.classList.add("open-popupCustomer");
  }

  function closeCustomerPopup() {
    popupCustomer.classList.remove("open-popupCustomer");
  }

  function validateCustomerInput(name) {
    if (!name || name.trim() === '') {
      alert('Customer name cannot be empty.');
      return false;
    }
    if (name.length < 3) {
      alert('Customer name must be at least 3 characters long.');
      return false;
    }
    return true;
  }

  function saveCustomer() {
    const customerName = document.getElementById('kname').value;

    if (!validateCustomerInput(customerName)) {
      return;
    }

    const data = { name: customerName };

    fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Customer saved:', data);
        alert('Customer saved successfully.');
        closeCustomerPopup();
      })
      .catch(error => {
        console.error('Error saving customer:', error);
        alert('Failed to save customer. Please try again later.');
      });
  }

  popupButtonCustomer.addEventListener('click', openCustomerPopup);
  submitButtonCustomer.addEventListener('click', saveCustomer);
  cancelButtonCustomer.addEventListener('click', closeCustomerPopup);
});


//popupTask
document.addEventListener('DOMContentLoaded', function () {
  let popupTask = document.getElementById('idPopupTask');
  let popupButtonTask = document.getElementById('popupButtonTask');
  let submitButtonTask = document.querySelector('#idPopupTask .close-popup-task-button.submit');
  let cancelButtonTask = document.querySelector('#idPopupTask .close-popup-task-button.cancel');

  function openTaskPopup() {
    popupTask.classList.add("open-popupTask");
  }

  function closeTaskPopup() {
    popupTask.classList.remove("open-popupTask");
  }

  function saveTask() {
    const customerId = document.getElementById('customer').value;
    const taskName = document.getElementById('tname').value;

    if (!customerId) {
      alert('Please select a customer.');
      return;
    }

    if (!taskName || taskName.trim() === '') {
      alert('Task name cannot be empty.');
      return;
    }

    const data = { customerId, name: taskName };

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Task saved:', data);
        alert('Task saved successfully.');
        closeTaskPopup();
      })
      .catch(error => {
        console.error('Error saving task:', error);
        alert('Failed to save task. Please try again later.');
      });
  }

  popupButtonTask.addEventListener('click', openTaskPopup);
  submitButtonTask.addEventListener('click', saveTask);
  cancelButtonTask.addEventListener('click', closeTaskPopup);
});



//display customer name on jobsite
document.addEventListener('DOMContentLoaded', function () {
  function fetchCustomers() {
    fetch('http://localhost:3000/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(customers => {
        const taskTable = document.querySelector('.taskTable');
        customers.forEach(customer => {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.textContent = customer.Name;
          cell.addEventListener('click', () => {
            window.location.href = `jobsites.html?customer=${encodeURIComponent(customer.Name)}`;
          });
          row.appendChild(cell);
          taskTable.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }

  fetchCustomers();
});

















document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const customerName = urlParams.get('customer');
  if (customerName) {
    document.querySelector('.jobListCustomer').textContent = customerName;
    fetchTasks(customerName);
  }

  function getTimeFromString(timeString) {
    const parts = timeString.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }




  function fetchTasks(customerName) {
    fetch(`http://localhost:3000/tasks?customer=${encodeURIComponent(customerName)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(tasks => {
        const jobList = document.querySelector('.jobList');
        tasks.forEach(task => {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.textContent = task.name;
          cell.addEventListener('click', () => {
            fetchTaskDetails(task.taskID);
          });
          row.appendChild(cell);
          jobList.appendChild(row);
        });
      })

      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }


  function toTimefromString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  function fetchTaskDetails(taskId) {
    const sTimeTable = document.getElementById('taskTime');
    let rows = sTimeTable.getElementsByClassName('rowTask');
    for (let i = 0; i < rows.length; i++) {
      sTimeTable.removeChild(rows[i]);
    }
    const sTotalTime = document.getElementById('totalTime');
    let timeRows = sTimeTable.getElementsByClassName('timeRow');
    for (let i = 0; i < timeRows.length; i++) {
      sTotalTime.removeChild(timeRows[i]);
    }

    document.getElementById('totalTime').getElementsByTagName('tbody')[0].innerHTML = '';
    fetch(`http://localhost:3000/taskDetails?taskId=${taskId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        else if (response.status === 204) {
          console.log('No task details found');
          return null;
        }
        return response.json();
      })
      .then(taskDetails => {
        const sTimeTable = document.getElementById('taskTime');
        if (taskDetails === null) {
          alert('No time registrations found for this task.');
          return;
        }

        taskDetails.forEach(taskDetail => {

          const row = document.createElement('tr');
          row.classList.add('rowTask');

          const commentCell = document.createElement('td');
          commentCell.textContent = taskDetail.comment;
          commentCell.classList.add('commentText');
          row.appendChild(commentCell);

          const timeFromCell = document.createElement('td');
          timeFromCell.textContent = taskDetail.startTime;
          timeFromCell.classList.add('taskTimeUsedFrom');
          row.appendChild(timeFromCell);

          const timeToCell = document.createElement('td');
          timeToCell.textContent = taskDetail.endTime;
          timeToCell.classList.add('taskTimeUsedTo');
          row.appendChild(timeToCell);

          sTimeTable.getElementsByTagName('tbody')[0].appendChild(row);

        });
        // Fetch and display all time registrations
       // fetchTimeRegistrations(taskId);
      })
      .then(() => {
          const timeTabel = document.getElementById('taskTime');
            let rows = Array.from(timeTabel.getElementsByClassName('rowTask'));
            let result = rows.reduce((total,row) => {
              const taskTimeUsedFrom = row.querySelector('.taskTimeUsedFrom').innerText;
              const taskTimeUsedTo = row.querySelector('.taskTimeUsedTo').innerText;
              return getTimeFromString(taskTimeUsedTo) - getTimeFromString(taskTimeUsedFrom) + total;
            } , 0);
            const totalTime = document.getElementById('totalTime');
            const row = document.createElement('tr');
            row.classList.add('timeRow');
            const cell = document.createElement('td');
            cell.textContent = toTimefromString(result);
            row.appendChild(cell);
            totalTime.appendChild(row);
        })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  }



  // Popup window for deleting task
  const deleteTaskButton = document.querySelector('.deleteJob');
  const deleteTaskPopup = document.getElementById('deleteTaskPopup');
  const closePopup = document.querySelector('.close');
  const taskSelect = document.getElementById('taskSelect');
  const deleteTaskButtonPopup = document.getElementById('deleteTaskButton');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const message = document.getElementById('message');

  deleteTaskButton.addEventListener('click', () => {
    fetchTasksForDeletion();
    deleteTaskPopup.style.display = 'block';
  });

  closePopup.addEventListener('click', () => {
    deleteTaskPopup.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === deleteTaskPopup) {
      deleteTaskPopup.style.display = 'none';
    }
  });

  deleteTaskButtonPopup.addEventListener('click', () => {console.log(taskSelect);
    const taskId = taskSelect.value; // Henter den valgte opgave ID
    if (taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(taskId); // Kald deleteTask-funktionen
      }
    } else {
      alert('Please select a task to delete.');
    }
  });





  function fetchTasksForDeletion() {
    const customerName = document.querySelector('.jobListCustomer').textContent;
    fetch(`http://localhost:3000/tasks?customer=${encodeURIComponent(customerName)}`)
      .then(response => response.json())
      .then(tasks => {
        taskSelect.innerHTML = '<option value="">Select Task</option>';
        tasks.forEach(task => {
          const option = document.createElement('option');
          option.value = task.taskID;
          option.textContent = task.name;
          taskSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  function deleteTask(taskId) { console.log('Deleting task:', taskId);
    const loadingIndicator = document.getElementById('loadingIndicator');
    const message = document.getElementById('message');
    loadingIndicator.style.display = 'block';

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(response => {
        loadingIndicator.style.display = 'none';
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        message.textContent = 'Task deleted successfully';
        deleteTaskPopup.style.display = 'none';
        fetchTasks(document.querySelector('.jobListCustomer').textContent);
      })
      .catch(error => {
        loadingIndicator.style.display = 'none';
        message.textContent = 'Error deleting task: ' + error.message;
        console.error('Error deleting task:', error);
      });
  }
});

// create new task for customer
document.addEventListener('DOMContentLoaded', function () {
  const createTaskButton = document.getElementById('createTaskButton');
  const createTaskPopup = document.getElementById('createTaskPopup');
  const closePopup = document.querySelector('.close');
  const createTaskForm = document.getElementById('createTaskForm');

  createTaskButton.addEventListener('click', () => {
    createTaskPopup.style.display = 'block';
  });

  closePopup.addEventListener('click', () => {
    createTaskPopup.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === createTaskPopup) {
      createTaskPopup.style.display = 'none';
    }
  });

  createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const customerName = document.querySelector('.jobListCustomer').textContent;

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerName, name: taskName })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert('Task created successfully');
        createTaskPopup.style.display = 'none';
        fetchTasks(customerName); // Refresh the task list
      })
      .catch(error => {
        console.error('Error creating task:', error);
        alert('Error creating task: ' + error.message);
      });
  });
});
