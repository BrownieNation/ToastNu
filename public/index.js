
// let adminNav = document.getElementById('admin');
// let bestillingerNav = document.getElementById('bestillinger');

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function getText(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.text();
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

async function deLete(url) {
    let respons = await fetch(url, {
        method: "DELETE"
    });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}


// -- Test det --
// adminNav.addEventListener('click', function() {
//     openTab(adminNav.id);
    
// }, false)

// bestillingerNav.addEventListener('click', function(){
//     openTab(bestillingerNav.id);
// }, false)

function openTab(tab) {
    $(document).ready(function () {
        $('#div1').load(tab + '.html')
    })
}

function main()
{
    // $.getJSON("./product.json", function(json) {
    //     console.log(json); // this will show the info it in firebug console
    // });


    let product= require('../product.json');
    console.log(product.Produkter);
  
}
main();