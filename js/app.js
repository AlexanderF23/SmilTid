

//popup Scripts
//popupCustomer
document.addEventListener('DOMContentLoaded', function() {
  let popupCustomer = document.getElementById('idPopupCustomer');
  let popupButtonCustomer = document.getElementById('popupButtonCostumer');

  function openCustomerPopup() {
    popupCustomer.classList.add("open-popupCustomer");
  }

  function closeCustomerPopup() {
    popupCustomer.classList.remove("open-popupCustomer");
  }

  popupButtonCustomer.addEventListener('click', openCustomerPopup);
  document.querySelector('.close-popup-customer-button').addEventListener('click', closeCustomerPopup);
});



//popupTask
document.addEventListener('DOMContentLoaded', function() {
  let popupTask = document.getElementById('idPopupTask');
  let popupButtonTask = document.getElementById('popupButtonTask');

  function openTaskPopup() {
    popupTask.classList.add("open-popupTask");
  }

  function closeTaskPopup() {
    popupTask.classList.remove("open-popupTask");
  }

  popupButtonTask.addEventListener('click', openTaskPopup);
  document.querySelector('.close-popup-task-button').addEventListener('click', closeTaskPopup);
});

//popupEmployee
document.addEventListener('DOMContentLoaded', function() {
  let popupEmployee = document.getElementById('idPopupEmployee');
  let popupButtonEmployee = document.getElementById('popupButtonEmployee');

  function openEmployeePopup() {
    popupEmployee.classList.add("open-popupEmployee");
  }

  function closeEmployeePopup() {
    popupEmployee.classList.remove("open-popupEmployee");
  }

  popupButtonEmployee.addEventListener('click', openEmployeePopup);
  document.querySelector('.close-popup-Employee-button').addEventListener('click', closeEmployeePopup);
});
