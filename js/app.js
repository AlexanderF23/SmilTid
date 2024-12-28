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
    let cancelButtonCustomer = document.getElementById('cancel');

 function openCustomerPopup() {
    popupCustomer.classList.add("open-popupCustomer");
 }

  function closeCustomerPopup() {
     popupCustomer.classList.remove("open-popupCustomer");
   }

  popupButtonCustomer.addEventListener('click', openCustomerPopup);
   document.querySelector('.close-popup-customer-button').addEventListener('click', closeCustomerPopup);
  cancelButtonCustomer.addEventListener('click', closeCustomerPopup);
 });


//popupTask
document.addEventListener('DOMContentLoaded', function () {
  let popupTask = document.getElementById('idPopupTask');
  let popupButtonTask = document.getElementById('popupButtonTask');
  let cancelButtonTask = document.querySelector('#idPopupTask .close-popup-task-button.cancel');

  function openTaskPopup() {
    popupTask.classList.add("open-popupTask");
  }

  function closeTaskPopup() {
    popupTask.classList.remove("open-popupTask");
  }

  popupButtonTask.addEventListener('click', openTaskPopup);
  cancelButtonTask.addEventListener('click', closeTaskPopup);
});

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




