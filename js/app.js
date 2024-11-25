
//popup
document.addEventListener('DOMContentLoaded', function() {
  let popup = document.getElementById('popup');
  let popupButton = document.getElementById('popupButton');

  function openPopup() {
    popup.classList.add("open-popup");
  }

  function closePopup() {
    popup.classList.remove("open-popup");
  }

  popupButton.addEventListener('click', openPopup);
  document.querySelector('.close-popup-button').addEventListener('click', closePopup);
});
