const alert = document.querySelector(".alert")
function displayAlert(message,type) {
    alert.innerHTML = `${message}`
    alert.id = `${type}`
    alert.classList.add("active")
    setTimeout(()=>{
        alert.classList.remove('active')
        alert.id = ``
    },2000)
}