
async function validateLogin() {
       
        let userName = document.getElementById("userUsername").value;
        let password = document.getElementById("userPassword").value;
        let products = await get('/products');
        console.log(products);
        let users = await get('/users');
        console.log(users)
        for (user of users) {
                if (user._userID == userName && user.password == password) {

                        alert("Logind Godkendt!");
                        window.location = "kontakt.html";
                        return true;
                } 
        }
        alert("Forkert brugernavn eller password!");
        return false;
}


async function postUser() {
        let _userID = document.getElementById("_userID").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
        await post('/users', {
                _userID, name, password, phoneNumber
        });

}
