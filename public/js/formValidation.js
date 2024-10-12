// In public/js/formValidation.js
document.getElementById('add-classification-form').addEventListener('submit', function (event) {
    const input = document.getElementById('classificationName').value;
    const regex = /^[a-zA-Z0-9]+$/;
  
    if (!regex.test(input)) {
      alert('Classification name must not contain spaces or special characters.');
      event.preventDefault();
    }
  });
  