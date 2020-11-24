
const app = express();
const router = express.Router();
const fetch = require('node-fetch');

app.use("/", router);

console.log("er inde i signUp");
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

document.getElementById('submit').addEventListener('click', function () {
    let _userID = document.getElementById("_userID").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    await post('/users', {
        _userID, name, password, phoneNumber
    })
});
