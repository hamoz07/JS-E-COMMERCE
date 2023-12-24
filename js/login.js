const signupFormer = document.querySelector("#login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signupBtn = document.querySelector("#loginBtn");

signupFormer.addEventListener("submit", (e) => {
  e.preventDefault();

  let getLocal = JSON.parse(localStorage.getItem("user"));
  let getemail = getLocal?.email;
  let getpass = getLocal?.password;

  console.log(getemail);

  if (email.value === "" || password.value === "") {
    displayAlert("Please Enter Data", "error");
  } else if (password.value.length < 8) {
    signupBtn.textContent = "loading...";
    setTimeout(() => {
      displayAlert("please enter a password of 8 characters at least", "error");
      signupBtn.textContent = "signup";
    }, 2500);
  } else {
    if (email.value === getemail && password.value === getpass) {
        signupBtn.textContent = "loading...";
        setTimeout(() => {
            signupBtn.textContent = "login";
        }, 1500);
        setTimeout(()=>{
            window.location = "index.html";
        },500)
        
    }else if(getemail === undefined || getpass === undefined){
        signupBtn.textContent = "loading...";
        setTimeout(() => {
          displayAlert("this email doesn't exist", "error");
          signupBtn.textContent = "login";
        }, 2500);
    }
    else {
        signupBtn.textContent = "loading...";
        setTimeout(() => {
          displayAlert("email or password is not correct", "error");
          signupBtn.textContent = "login";
        }, 2500);
    } 
  }
});
