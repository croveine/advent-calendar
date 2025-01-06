// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

// Function to open the modallet selectedProduct = '';
let selectedProduct = '';

function openModal(button) {
    const modal = document.getElementById('orderModal');
    selectedProduct = button.getAttribute('data-product'); // Get the product name
    modal.style.display = 'block'; // Show the modal
  }

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('orderModal');
  modal.style.display = 'none'; // Hide the modal
}

// Event listener for form submission
document.getElementById('orderForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  // Send data to the server
  fetch('api/send-order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, product: selectedProduct }) // Include the selected product
  })
  .then(response => {
      if (response.ok) {
          closeModal();
          alert('Congrats! Your order has been placed!'); // Confirmation message
      } else {
          alert('There was an error placing your order. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('There was an error placing your order. Please try again.');
  });
});
// Event listener for the "Купити" buttons
document.querySelectorAll('.buy-now-button').forEach(button => {
  button.addEventListener('click', function() {
      openModal(this);
  });
});