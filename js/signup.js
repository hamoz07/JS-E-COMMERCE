const signupForm = document.querySelector("#signup");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signupBtn = document.querySelector("#signupBtn");
let user;
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let getLocal = JSON.parse(localStorage.getItem("user"));
  let getemail = getLocal?.email;

  if (username.value === "" || email.value === "" || password.value === "") {
    displayAlert("Please Enter Data", "error");
  } else if (password.value.length < 8) {
    signupBtn.textContent = "loading...";
    setTimeout(() => {
      displayAlert("please enter a password of 8 characters at least", "error");
      signupBtn.textContent = "signup";
    }, 2500);
  } else {
    if (email.value === getemail) {
      signupBtn.textContent = "loading...";
      setTimeout(() => {
        displayAlert("this user already exists", "error");
        signupBtn.textContent = "signup";
      }, 2500);
    } else {
      user = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      localStorage.setItem("user", JSON.stringify(user));

      signupBtn.textContent = "loading...";
      setTimeout(() => {
        window.location = "login.html";
      }, 2500);
    }
  }
});
