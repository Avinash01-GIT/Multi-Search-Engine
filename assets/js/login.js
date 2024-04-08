// Function to save user data in local storage
function saveUserData(username, email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! You can now login with your credentials.");
}

// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}

// Function to perform login
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user with matching email and password
  const user = users.find((u) => u.email === email && u.password === password);

  return user;
}

// Event listener for signup form submission
document
  .querySelector(".form-container.sign-up form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector(
      '.form-container.sign-up input[type="text"]'
    ).value;
    const email = document.querySelector(
      '.form-container.sign-up input[type="email"]'
    ).value;
    const password = document.querySelector(
      '.form-container.sign-up input[type="password"]'
    ).value;

    saveUserData(username, email, password);
  });

// Event listener for login form submission
document
  .querySelector(".form-container.sign-in form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector(
      '.form-container.sign-in input[type="email"]'
    ).value;
    const password = document.querySelector(
      '.form-container.sign-in input[type="password"]'
    ).value;

    // Check if email and password are not empty
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const user = loginUser(email, password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect user to main page after login
      window.location.href = "./multi.html";
    } else {
      alert("Invalid email or password");
    }
  });

// Toggle functionality
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
