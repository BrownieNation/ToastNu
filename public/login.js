

function validateLogin() {
        let login = false;
        let userName = document.getElementById("userUsername").value;
        let password = document.getElementById("userPassword").value;
        let logOut = document.getElementById("#navbarOUT");
        let logIn = document.getElementById("#navbarIN");

        if (userName == "Torben" && password == "123") {

                alert("Logind Godkendt!");
                window.location = "kontakt.html";
                
                login = true;
                return logIN;
        } else {
                alert("Forkert brugernavn eller password!");
                return logOUT;
        }
}


