
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

$('.add-to-cart').on('click', (e) => {
    addToCart(e.currentTarget)
  })
  
  const addToCart = (product) => {
    const productId = $(product).attr('productId');
    const isAlreadyInCart = $.grep(productsInCart, el => {return el.id == productId}).length;
  
    if (isAlreadyInCart) {
      $.each(storageData, (i, el) => {
        if (productId == el.id) {
          el.itemsNumber += 1;
        }
      })
    } else {
      const newProduct = {
        id: Number(productId),
        itemsNumber: 1
      }
  
      storageData.push(newProduct);
    }
  
    updateCart();
    updateProductList();
  }

  $(document).ready(() => {
    let storageData = [];
  
    $.get("product.json", (res) => {
      productList = res;
  
      const isStorageEmpty = Cookies.getStorage('cart').length === 0;
  
      if (!isStorageEmpty) {
        storageData = Cookies.getStorage('cart');
      }
  
      updateCart();
      buildProductList();
      buildDropdownCart();
      bindProductEvents();
    });
  });

  const updateCart = () => {
    Cookies.setStorage('cart', storageData);
    productsInCart = [];
  
    parseStorageDataWithProduct();
    updatePill();
    updateTotalAmount();
  }
  
  const parseStorageDataWithProduct = () => {
    $.each(storageData, (i, el) => {
      const id = el.id;
      const itemsNumber = el.itemsNumber;
  
      $.each(productList, (i, el) => {
        if (id == el.id) {
          el.itemsNumber = itemsNumber;
          productsInCart.push(el)
        }
      });
    });
  }
  
  const updatePill = () => {
    let itemsInCart = 0;
  
    $.each(productsInCart, (i, el) => {
      itemsInCart += el.itemsNumber;
    });
  
    $('.glyphicon').html(itemsInCart);
  }
  
  const updateTotalAmount = () => {
    let total = 0;
    const shippingCost = 0;
    let summary = (total + shippingCost).toFixed(2);
  
    $.each(productsInCart, (i, el) => {
      total += el.itemsNumber * el.price;
    });
  
    $('#total-price').html(`$${total.toFixed(2)}`);
    $('#shipping-price').html(shippingCost === 0 ? 'Free' : `$${shippingCost}`);
    $('#summary').html(`$${summary}`);
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