

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


async function postUser(){
        let _userID = document.getElementById("_userID").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
        await post('/users', {
            _userID, name, password, phoneNumber
        });
    
}
