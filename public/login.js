function validateLogin(){
let userName = document.getElementById("userUsername").value;
let password = document.getElementById("userPassword").value;

if(userName == "Torben" && password == "123"){
    
alert("Logind Godkendt!");
        window.location = "kontakt.html";
        return false;
} else{
alert("Forkert brugernavn eller password!");
// return false;
}
}

// function loginAccept(){

// }