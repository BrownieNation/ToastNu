let addToCartButtons = document.querySelectorAll('.shop-item-button')

let products = [
    {
        name:'placeholder1',
        category: 'food',
        price: 20,
        inCart: 0
    },

    {
        name:'placeholder2',
        category: 'snack',
        price: 10,
        inCart: 0
    },

    {
        name:'placeholder3',
        category: 'food',
        price: 30,
        inCart: 0
    },

    {
        name:'placeholder4',
        category: 'drink',
        price: 15,
        inCart: 0
    },

    {
        name:'placeholder5',
        category: 'drink',
        price: 18,
        inCart: 0
    },

    {
        name:'placeholder6',
        category: 'food',
        price: 10,
        inCart: 0
    },

]


for (let i=0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', () => {
        cartNumbers();
    })
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelectorAll('.glyphicon-shopping-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelectorAll('.glyphicon-shopping-cart span').textContent = 1;
    }

    
}

