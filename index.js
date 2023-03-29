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

// REGISTER NEW USER
const userList = JSON.parse(localStorage.getItem("users")) || [
  { email: "admin@gmail.com", password: "Admin123!" },
];
document.getElementById("registerBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("registerEmail");
  const password = document.getElementById("registerPassword");
  let validEmail = true;
  let validPassword = true;
  checkRegisterEmail();
  checkRegisterPassword();
  if (document.getElementById("emailValidation").innerHTML !== "") {
    validEmail = false;
  }
  if (document.getElementById("pwValidation").innerHTML !== "") {
    validPassword = false;
  }
  if (validEmail && validPassword) {
    const isEmailRegistered = userList.some(
      (user) => user.email === email.value
    );
    if (isEmailRegistered) {
      document.getElementById("emailValidation").innerHTML =
        "Email is already registered!";
      return;
    }
    userList.push({ email: email.value, password: password.value });
    localStorage.setItem("users", JSON.stringify(userList));
    window.location.href = "./signin/signin.html";
  }
});
