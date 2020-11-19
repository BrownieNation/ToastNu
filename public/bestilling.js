var checkout = document.getElementById('checkout')
var pImage = document.getElementById('productImage')
var pName = document.getElementById('productName')
var pDescription = document.getElementById('productDescription')
var pPrice = document.getElementById('ProductPrice')
var pAmount = document.getElementById('productAmount')
var total = document.getElementById('totalAmount')




checkout.onclick = checkoutHandler


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
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


async function checkoutHandler() {
    
}

let calculateTotal = function(items)
{
    let price=0;
    for(item of items)
    {
        price+=item.productPrice;
    }

    return price;
}
function createTablecontent()
{



}