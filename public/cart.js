
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


// for (let i=0; i < addToCartButtons.length; i++) {
//     addToCartButtons[i].addEventListener('click', () => {
//         cartNumbers();
//     })
// }

function cartNumbers() {
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

function generatecartItems()
{
    let cart= document.getElementsByClassName('table table-hover border bg-white')[0];
    let buyString=localStorage.getItem('cartitems');
    let arr=buyString.split("__");
    let finalstring=[];

    for(let i=0;i<arr.length;i++)
    {
        let itemstring=arr[i].split("splithere");
        let tmp=[];
        for(let j=0;j<itemstring.length;j++)
        {
             tmp.push(itemstring[j]);
        }
        tmp[0]=(tmp[0].replace(" ,-",""));
        finalstring.push(tmp);
    }
    console.log(finalstring);

    for(let i=0;i<finalstring.length-1;i++)
    {
        let newitem= document.createElement('div');
        newitem.innerHTML=` <tr>
<td>
    <div class="row">
        <div class="col-lg-2 Product-img">
            <img id = "productImage"src="${finalstring[i][2]}" alt="..." class="img-responsive"/>
        </div>
        <div class="col-lg-10">
            <h4 class="nomargin" id = "productName">${finalstring[i][1]}</h4>
            <p id = "productDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </div>
</td>
<td id = "productPrice"> ${parseInt(finalstring[i][0])} ,- </td>
<td data-th="Quantity">
    <input id= "productAmount" type="number" class="form-control text-center" value="1">
</td>
<td id= "subtotal">12,000</td>
<td class="actions" data-th="" style="width:10%;">
    <button id="buttonRefresh" class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
    <button id="buttonDelete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
</td>
</tr>`;
cart.appendChild(newitem);
    }
}
// console.log(localStorage.getItem('cartitems'));
generatecartItems();

// let cart= document.getElementsByClassName('cartItems')[0];
// console.log(cart.className);
// let newitem= document.createElement('div');
// newitem.innerHTML=` <tr>
// <td>
//     <div class="row">
//         <div class="col-lg-2 Product-img">
//             <img id = "productImage"src="${img}" alt="..." class="img-responsive"/>
//         </div>
//         <div class="col-lg-10">
//             <h4 class="nomargin" id = "productName">${title}</h4>
//             <p id = "productDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//             tempor incididunt ut labore et dolore magna aliqua.</p>
//         </div>
//     </div>
// </td>
// <td id = "productPrice"> ${price} ,- </td>
// <td data-th="Quantity">
//     <input id= "productAmount" type="number" class="form-control text-center" value="1">
// </td>
// <td id= "subtotal">12,000</td>
// <td class="actions" data-th="" style="width:10%;">
//     <button id="buttonRefresh" class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
//     <button id="buttonDelete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
// </td>
// </tr>`;
// cart.appendChild(newitem);