const registrationForm = document.getElementById('registrationForm');
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const redirectButton = document.getElementById('redirectButton'); // Button for redirect
const closeModal = document.querySelector('.close');

function showModal(message) {
  modalMessage.textContent = message;
  messageModal.style.display = 'block';
  // Hide the redirect button initially
  redirectButton.style.display = 'none';
}

closeModal.addEventListener('click', () => {
  messageModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === messageModal) {
    messageModal.style.display = 'none';
  }
});

function getCurrentDate() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  return now.toLocaleDateString('en-US', options); 
}

function isAlphanumeric(password) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/; 
  return alphanumericRegex.test(password);
}

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registrationForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const role = formData.get('role');

  if (password !== confirmPassword) {
    showModal("Passwords do not match. Please re-enter your details.");
    return;
  }

  if (!isAlphanumeric(password)) {
    showModal("Password must be alphanumeric (letters and numbers only).");
    return;
  }

  const data = { name, email, password, role };

  try {
    const response = await fetch('https://674ed4cabb559617b26ce69c.mockapi.io/Login-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const registrationDate = getCurrentDate();
      showModal(`Registration with INVEXTECH successful! You registered on ${registrationDate}.`);

      setTimeout(() => {
        redirectButton.style.display = 'inline-block';
      }, 1500); 
    } else {
      showModal("Registration failed. Please try again.");
    }
  } catch (err) {
    showModal("Network error. Please try again.");
  }
});

redirectButton.addEventListener('click', () => {
  window.location.href = 'login.html';
});
