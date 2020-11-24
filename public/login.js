

function validateLogin(){
let login = false;
let userName = document.getElementById("userUsername").value;
let password = document.getElementById("userPassword").value;

if(userName == "Torben" && password == "123"){
    
alert("Logind Godkendt!");
        window.location = "kontakt.html";
        login = true;
        return false;
} else{
alert("Forkert brugernavn eller password!");
}
}


