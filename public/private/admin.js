
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}
async function DELETE(url, objekt) {
    console.log(url);
    const respons = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 200) 
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

async function generateProducts()
{
   let selector = document.getElementById('selector');
    for(product of await get('/products'))
    {
       
       let option = document.createElement('option');
       option.className='productlistitem';
       option.id=product._productID
       option.textContent = product.productName;
       selector.appendChild(option);
    }

}
async function postProduct() {
    // const controller = require('../controller/controller');

    let productName= document.getElementById("ProductName").value;
    let pris = document.getElementById("ProductPris").value;
    let beskrivelse = document.getElementById("ProductBeskrivelse").value;
    let id = document.getElementById("ProductId").value;
    let img ="https://images2.minutemediacdn.com/image/upload/c_crop,h_843,w_1500,x_0,y_10/v1555172614/shape/mentalfloss/iStock-177369626_1.jpg?itok=YfyNMOBR";
    let category="Drikkevare";
    console.log(productName + " " + pris + " " + beskrivelse + " " +id);
    if(productName && pris && beskrivelse && id)
        await post('/products', {
            id,productName,beskrivelse,pris,img,category
        });

}

generateProducts();


document.getElementById('delete').addEventListener('click',async function()
{


    let item = document.getElementById('selector').value;
    for(product of await get('/products'))
    {
        if(product.productName==item)
        {
            item=product._productID;
            break;
        }
        
    }
    console.log(item);
        await DELETE('/products',{item});

    

})

document.getElementById('addButton').addEventListener('click',async function()
{
    postProduct();
})


