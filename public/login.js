

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

function postUser(){
        console.log("hej");
    // document.getElementById('confirm').addEventListener('click', function () {
    //     console.log("Node");
    //     let _userID = document.getElementById("_userID").value;
    //     let name = document.getElementById("name").value;
    //     let password = document.getElementById("password").value;
    //     let phoneNumber = document.getElementById("phoneNumber").value;
    //     await post('/users', {
    //         _userID, name, password, phoneNumber
    //     })
    // });
    }
    async function post(url, objekt) {
        const respons = await fetch(url, {
            method: "POST",
            body: JSON.stringify(objekt),
            headers: { 'Content-Type': 'application/json' }
        });
        if (respons.status !== 200) // Created
            throw new Error(respons.status);
        return await respons.json();
    }
async function postUser(){
        let _userID = document.getElementById("_userID").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        console.log(phoneNumber);
        await post('/users', {
            _userID, name, password, phoneNumber
        })
    
}
