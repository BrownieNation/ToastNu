


async function validateLogin() {

        let userName = document.getElementById("userUsername").value;
        let password = document.getElementById("userPassword").value;

        let users = await get('/users');

        for (user of users) {
                if(user.loggedIn==true)
                {
                        alert("Bruger allerede Logget ind");
                        break;
                }
                if (user._userID == userName && user.password == password) {
                        alert("Logind Godkendt!");
                        sessionStorage.setItem('UserID', user._userID);
                        if(user.isAdmin)
                        {
                                sessionStorage.setItem('isAdmin',user.isAdmin);
                                window.location = "./private/admin.html";
                        }
                        else  {
                                location.reload();
                        } 
                        let loggedIn=true;
                        await post(`/users/login/${user._userID}`,{loggedIn});
                        return true;
                }
        
        }
        alert("Forkert brugernavn eller password!");
        return false;
}

// async function validateLogin() {
//         const controller = require('../controller/controller');

//         let userName = document.getElementById("userUsername").value;
//         let password = document.getElementById("userPassword").value;

//         let users = await get('/users');

//         for (user of users) {
//                 if (user._userID == userName && controller.verifyPassword(user.password, password)) {

//                         alert("Logind Godkendt!");
//                         sessionStorage.setItem('UserID',user._userID);
//                         location.reload();
//                         return true;
//                 } 
//         }
//         alert("Forkert brugernavn eller password!");
//         return false;
// }



async function postUser() {
        // const controller = require('../controller/controller');

        let _userID = document.getElementById("_userID").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
        let isAdmin = false;
        let loggedIn=false;
        
        await post('/users', {
                _userID, name, password, phoneNumber, isAdmin,loggedIn
        });

}



function loginCheck() {

        if (sessionStorage.getItem("UserID")) {
                $.get("navbarIN.html", function (data) {
                        $("#nav-placeholder").replaceWith(data);
                });
        }
        else {
                $.get("navbarOUT.html", function (data) {
                        $("#nav-placeholder").replaceWith(data);
                });
        }
} 
loginCheck();


async function  logud() {
        let loggedIn=false;
        await post(`/users/login/${sessionStorage.getItem('UserID')}`,{loggedIn});
        sessionStorage.clear();
        window.location = "../index.html";
}
