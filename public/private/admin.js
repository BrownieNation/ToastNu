async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function generateProducts(item)
{
    if ($(item).is(':empty')){
        //do something
      
    for(product of await get('/products'))
    {
       
       let option = document.createElement('option');
       option.className='productlistitem';
       option.textContent = product.productName;
       item.appendChild(option);
    }
}
}
async function postProduct() {
    // const controller = require('../controller/controller');

    let productName= document.getElementById("ProductName").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
    
    
    await post('/products', {
            _userID, name, password, phoneNumber,
    });

}


