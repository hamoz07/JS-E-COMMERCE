let myOrdersHolder = document.querySelector("#myOrders");
let settingsSection = document.querySelector("#settingsSection");
let usernameProfile = document.querySelector("#userName");

usernameProfile.innerHTML = `${JSON.parse(localStorage.getItem("user"))?.username}`;

document.addEventListener("click", (e) => {
  if (
    e.target.id === "myOrdersLink" ||
    e.target.id === "myOrdersRow" ||
    e.target.id === "myOrderIcon" ||
    e.target.id === "myOrderText"
  ) {
    myOrdersHolder.classList.add("show");
    settingsSection.classList.remove("show");
  }

  if (
    e.target.id === "settingsLink" ||
    e.target.id === "mySettingsRow" ||
    e.target.id === "settingsIcon" ||
    e.target.id === "settingText"
  ) {
    myOrdersHolder.classList.remove("show");
    settingsSection.classList.add("show");
  }

  if (
    e.target.id === "logoutLink" ||
    e.target.id === "myLogoutRow" ||
    e.target.id === "logoutIcon" ||
    e.target.id === "logoutText"
  ) {
    window.location = "login.html";
  }

  if (e.target.id === "deleteAcc") {
    window.location = "signup.html";
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  }
});

//!  ====================================================================================

table.innerHTML = "<p class='loading'>loading...</p>";

if (cart.length === 0) {
  setTimeout(() => {
    table.innerHTML = "<p class='loading'>no products</p>";
  }, 1000);
} else {
  setTimeout(() => {
    insertTable();
  }, 1000);
}

let changeemail = document.querySelector("#changeemail");
let changeusername = document.querySelector("#changeusername");
let changepassword = document.querySelector("#changepassword");
let emailInput = document.querySelector("#email");
let usernameInput = document.querySelector("#usernameInput");
let passInput = document.querySelector("#password");

let newUserData = JSON.parse(localStorage.getItem("user")) || {};


console.log(newUserData);

changeemail.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailInput.value === "") {
    displayAlert("please enter a new email", "error");
  } else {
    newUserData.email = emailInput.value;
    localStorage.setItem("user", JSON.stringify(newUserData));
    emailInput.value = ""
    displayAlert("email changed successfully", "success");
  }
});

changeusername.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameInput.value === "") {
    displayAlert("please enter a new name", "error");
  } else {
    newUserData.username = usernameInput.value;
    localStorage.setItem("user", JSON.stringify(newUserData));
    helloUserName.textContent = `${newUserData.username.split(" ")[0]}`;
    usernameProfile.innerHTML = `${newUserData.username}`;
    usernameInput.value = ""
    displayAlert("name changed successfully", "success");
  }
});

changepassword.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passInput.value === "") {
    displayAlert("please enter a new password", "error");
  } else if (passInput.value !== "" && passInput.value.length < 8) {
    displayAlert(
      "please enter a new password of 8 characters at least",
      "error"
    );
  } else {
    newUserData.password = passInput.value;
    localStorage.setItem("user", JSON.stringify(newUserData));
    passInput.value = ""
    displayAlert("password changed successfully", "success");
}
});

