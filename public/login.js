
async function get(url) {
        const respons = await fetch(url);
        if (respons.status !== 200) // OK
            throw new Error(respons.status);
        return await respons.json();
    }

async function validateLogin() {
       
        let userName = document.getElementById("userUsername").value;
        let password = document.getElementById("userPassword").value;

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
