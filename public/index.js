
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


//Adds wares to cart
function cartNumbers() {

  console.log('Click');

    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('cartAmount').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('cartAmount').textContent = 1;
    }

}
function cartItems(price,title,img)
{
    let buystring= localStorage.getItem('cartitems');
    if(buystring===null)
        buystring="";
    let newstring=price + "splithere" + title + "splithere" + img + "__";
    console.log(buystring.includes(newstring));
    if(!buystring.includes(newstring))
    {
        buystring+=newstring;
        localStorage.setItem('cartitems',buystring);
        cartNumbers();
    }
   
}
async function generateItems(products)
{
    let row= document.getElementById('itemcontent');
    let categories= document.getElementById('list');
    let categorylist=[];
    for(product of products)
    {
        let newitem=document.createElement('div');
        newitem.className="col-lg-4 col-md-6 mb-4";
        newitem.innerHTML=` <div class="card h-100">
        <a href="#"><img class="card-img-top" src="${product.productImage}" alt=""></a>
        <div class="card-body">
            <h4 class="card-title">
                <a href="#" class="productname">${product.productName}</a>
            </h4>
            <p class="card-text">${product.productDescription}</p>
            <h5 class="pricetag">${product.productPrice} ,-</h5>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary shop-item-button"
            type="button">ADD TO CART</button>
        </div>
    </div>`;

    row.appendChild(newitem);
    if(!categorylist.includes(product.productCategory))
        categorylist.push(product.productCategory);

    }
    let addeeventtoitems= document.getElementsByClassName('col-lg-4 col-md-6 mb-4');
    // let addToCartButtons = document.querySelectorAll('.shop-item-button');
    for (let i=0; i < addeeventtoitems.length; i++) {
        let addToCartButtons = addeeventtoitems[i].querySelector('.shop-item-button');
         let price = addeeventtoitems[i].getElementsByClassName('pricetag')[0].innerHTML;
        let title = addeeventtoitems[i].getElementsByClassName('productname')[0].innerHTML;
        let img = addeeventtoitems[i].getElementsByClassName('card-img-top')[0].src;
        console.log(img);
        addToCartButtons.addEventListener('click', () => {           
            cartItems(price,title,img);
            
        })
    }
    for(category of categorylist)
    {
        let toadd = document.createElement('a');
        toadd.textContent=category;
        toadd.className="list-group-item";
        toadd.href="#"
        categories.appendChild(toadd);
    }

}

async function main()
{
 
    let products = await get('/products');
    generateItems(products);
    onLoadCartNumbers()
    
}
main();