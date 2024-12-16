if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js is running');



    // Fetch customer data
    fetch('http://localhost:3000/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the response to inspect it
        const customerSelect = document.getElementById('customer');
        if (!customerSelect) {
          console.error('Dropdown element with id "costomer" not found');
          return;
        }
        customerSelect.innerHTML = ''; // Clear existing options
        data.forEach(customers => {
          const option = document.createElement('option');
          option.value = customers.customerID; // Ensure this matches the actual property name
          option.textContent = customers.Name; // Ensure this matches the actual property name
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
  });
}

//popup Scripts
//popupCustomer
  //document.addEventListener('DOMContentLoaded', function () {
    //let popupCustomer = document.getElementById('idPopupCustomer');
    //let popupButtonCustomer = document.getElementById('popupButtonCostumer');

// function openCustomerPopup() {
//    popupCustomer.classList.add("open-popupCustomer");
//  }

//  function closeCustomerPopup() {
//     popupCustomer.classList.remove("open-popupCustomer");
//   }

//   popupButtonCustomer.addEventListener('click', openCustomerPopup);
//   document.querySelector('.close-popup-customer-button').addEventListener('click', closeCustomerPopup);
// });


//popupTask
// document.addEventListener('DOMContentLoaded', function () {
//   let popupTask = document.getElementById('idPopupTask');
//   let popupButtonTask = document.getElementById('popupButtonTask');

//    function openTaskPopup() {
//      popupTask.classList.add("open-popupTask");
//    }

//    function closeTaskPopup() {
//      popupTask.classList.remove("open-popupTask");
//    }

//   popupButtonTask.addEventListener('click', openTaskPopup);
//   document.querySelector('.close-popup-task-button').addEventListener('click', closeTaskPopup);
// });

//popupEmployee
// document.addEventListener('DOMContentLoaded', function () {
//   let popupEmployee = document.getElementById('idPopupEmployee');
//   let popupButtonEmployee = document.getElementById('popupButtonEmployee');

//   function openEmployeePopup() {
//      popupEmployee.classList.add("open-popupEmployee");
//    }

//    function closeEmployeePopup() {
//     popupEmployee.classList.remove("open-popupEmployee");
//    }

//   popupButtonEmployee.addEventListener('click', openEmployeePopup);
//   document.querySelector('.close-popup-Employee-button').addEventListener('click', closeEmployeePopup);
// });




