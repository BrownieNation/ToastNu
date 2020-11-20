
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
async function generateItems(products)
{
    let row= document.getElementById('itemcontent');
    for(product of products)
    {
        let newitem=document.createElement('div');
        newitem.className="col-lg-4 col-md-6 mb-4";
        newitem.innerHTML=` <div class="card h-100">
        <a href="#"><img class="card-img-top" src="${product.productImage}" alt=""></a>
        <div class="card-body">
            <h4 class="card-title">
                <a href="#">"${product.productName}"</a>
            </h4>
            <h5>"${product.productPrice}" ,-</h5>
            <p class="card-text">"${product.productDescription}"</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary shop-item-button"
            type="button">ADD TO CART</button>
        </div>
    </div>`;

    row.appendChild(newitem);
    }
}

async function main()
{
 
    let products = await get('/products');
    generateItems(products);
    
}
main();