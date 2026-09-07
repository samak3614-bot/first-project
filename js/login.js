let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#sign-in")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener("click",function (e){
    e.preventDefault()
    if (email.value === "" || password.value === ""){
        alert("please fill data")
    } else{
        if ((getEmail && getEmail.trim() === email.value.trim()) && (getPassword && getPassword.trim() === password.value.trim())){

            setTimeout( () => {
            window.location = "index.html"
        }, 500)} else {
            alert("email or password is wrong")
        }
    }
    })