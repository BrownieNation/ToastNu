async function generateProducts()
{
    let productlist = document.getElementsByClassName('dropdown-menu-admin')[0];
    for(product of await get('/products'))
    {
       let list = document.createElement('li');
       list.className('productlistitem');
       list.textContent=product.productName;
       productlist.appendChild(list);
    }
}
generateProducts();
