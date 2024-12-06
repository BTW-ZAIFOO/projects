const loginForm = document.getElementById('loginForm');
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close');

function showModal(message) {
  modalMessage.textContent = message;
  messageModal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
  messageModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === messageModal) {
    messageModal.style.display = 'none';
  }
});


function getCurrentDateTime() {
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    return now.toLocaleString('en-US', options);
  }
  

document.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');
  if (savedEmail && savedPassword) {
    document.getElementById('email').value = savedEmail;
    document.getElementById('password').value = savedPassword;
    document.getElementById('rememberMe').checked = true;
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');
  const rememberMe = formData.get('rememberMe') !== null;

  try {
    const response = await fetch('https://674ed4cabb559617b26ce69c.mockapi.io/Login-form');
    if (!response.ok) throw new Error("Failed to fetch INVEXTECH users");

    const users = await response.json();

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      const loginTime = getCurrentDateTime();
      const message = `Welcome To INVEXTECH, ${user.name}! You are logged in as ${user.role}. Login Time: ${loginTime}`;
      showModal(message);

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
    } else {
      showModal("Invalid email or password. Please try again.");
    }
  } catch (err) {
    showModal("Network error. Please try again.");
  }
});
