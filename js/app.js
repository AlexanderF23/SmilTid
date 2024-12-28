if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js is running');

    const customerSelect = document.getElementById('customer');
    const taskSelect = document.getElementById('task');
    const saveButton = document.querySelector('.tRButtonSave');

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
      .catch(error => {
        console.error('Error fetching customer data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load customer data. Please try again later.';
        errorMessage.style.color = 'red';
        document.body.appendChild(errorMessage);
      });

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


/*

//popupEmployee
 document.addEventListener('DOMContentLoaded', function () {
   let popupEmployee = document.getElementById('idPopupEmployee');
   let popupButtonEmployee = document.getElementById('popupButtonEmployee');
   let cancelButtonEmployee = document.getElementById('cancel');

   function openEmployeePopup() {
      popupEmployee.classList.add("open-popupEmployee");
    }

    function closeEmployeePopup() {
     popupEmployee.classList.remove("open-popupEmployee");
    }

   popupButtonEmployee.addEventListener('click', openEmployeePopup);
   document.querySelector('.close-popup-Employee-button').addEventListener('click', closeEmployeePopup);
   cancelButtonEmployee.addEventListener('click', closeEmployeePopup);
 });

 */


//display customer data on index page
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
          cell.textContent = customer.Name; // Ensure the property name matches the server response
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


