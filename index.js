// CHECK EMAIL BY INPUT
const checkRegisterEmail = () => {
  const emailSignUp = document.getElementById("registerEmail").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailSignUp)) {
    document.getElementById("emailValidation").innerHTML = "Invalid email!";
  } else {
    document.getElementById("emailValidation").innerHTML = "";
  }
};
document
  .getElementById("registerEmail")
  .addEventListener("input", checkRegisterEmail);

// CHECK PASSWORD BY INPUT
const checkRegisterPassword = () => {
  const passwordSignUp = document.getElementById("registerPassword").value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!passwordRegex.test(passwordSignUp)) {
    document.getElementById("pwValidation").innerHTML =
      "Must contain at least 8 characters, one uppercase, lowercase, number, and symbol!";
  } else {
    document.getElementById("pwValidation").innerHTML = "";
  }
};
document
  .getElementById("registerPassword")
  .addEventListener("input", checkRegisterPassword);

// API ENDPOINT FOR USER

const API_USER_ENDPOINT = "https://642433294740174043359209.mockapi.io/user";

// REGISTER NEW USER TO API USER ENDPOINT
let registerNewUser = async () => {
  try {
    const response = await fetch(API_USER_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email: `${document.getElementById("registerEmail").value}`,
        password: `${document.getElementById("registerPassword").value}`,
        id: ``,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

// REGISTER NEW USER
const emailInput = document.getElementById("registerEmail");
const passwordInput = document.getElementById("registerPassword");
document
  .getElementById("registerBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    try {
      const response = await fetch(API_USER_ENDPOINT);
      const users = await response.json();
      const isEmailRegistered = users.some((user) => user.email === email);
      if (isEmailRegistered) {
        document.getElementById("emailValidation").innerHTML =
          "Email is already registered!";
        return;
      }
      const newUser = { email, password };
      const createUserResponse = await fetch(API_USER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!createUserResponse.ok) {
        throw new Error("Failed to create user");
      }
      window.location.href = "./login.html";
    } catch (error) {
      console.error(error);
      document.getElementById("emailValidation").innerHTML =
        "Failed to register user. Please try again later.";
    }
  });
