
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}
async function DELETE(url, objekt) {
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
       option.textContent = product.productName + " id:" + product._productID;
       selector.appendChild(option);
    }

}
async function postProduct() {
    // const controller = require('../controller/controller');

    let productName= document.getElementById("ProductName").value;
    let pris = document.getElementById("ProductPris").value;
    let beskrivelse = document.getElementById("ProductBeskrivelse").value;
    let category= document.getElementById("Katogori").value;
    let id = await get('/products');
    id=parseInt(id[id.length-1]._productID)+1;
    console.log(id);
    let img =document.getElementById("myImg").value;
    console.log(productName + " " + pris + " " + beskrivelse + " " +id);
    if(productName && pris && beskrivelse && category && id)
        await post('/products', {
            id,productName,beskrivelse,pris,img,category
        });
    alert("Du har tilføjet " + productName + " til databasen!");
    location.reload();
}

generateProducts();


document.getElementById('delete').addEventListener('click',async function()
{


    let item = document.getElementById('selector').value;

    arr = item.split(" id:");
    if(confirm(`Er du sikker på at du vil slette ${arr[0]}?`)){
        let data=parseInt(arr[1]);
        txt = `Du har slettet ${arr[0]}`;
        await DELETE(`/products/${data}`,{data});
        alert(txt);
        location.reload();
    } else {
        txt = `Du har annulleret handlingen. ${arr[0]} vil ikke blive slettet!`;
        alert(txt);
    }

    

})

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
  });

  document.getElementById('addButton').addEventListener('click',function(){
    postProduct();
    
    
  })
  function imageIsLoaded() { 
    alert(this.src);  // blob url
    // update width and height ...
  }


