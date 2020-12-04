
function cartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('cartAmount').textContent = productNumbers + 1;
    } else {
        sessionStorage.setItem('cartNumbers', 1);
        document.getElementById('cartAmount').textContent = 1;
    }


}

function generatecartHTML(price,title,imgsrc,_productID,amount)
{
    let theprice=parseFloat(price);
    let toreturn =` 
    <td>
        <div class="row">
            <div class="col-lg-2 Product-img">
                <img id = "productImage"src="${imgsrc}" alt="..." class="img-responsive"/>
            </div>
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName" >${title}</h4>
            </div>
                <p class = "productID" style="display: none;">${_productID}</p> 
        </div>
    </td>
    <td id = "productPrice" class="productPrice"> ${theprice},-</td>
    <td data-th="Quantity">
        <input id= "productAmount" type="number" class="form-control text-center" value="${amount}">
    </td>
    <td class = "subtotal">${theprice*amount},-</td>
    <td class="actions" data-th="" style="width:10%;">
        <button id="buttonRefresh" class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
        <button id="buttonDelete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
    </td>
    `;
    return toreturn;
}

function addItemAmount(price,subtotal)
{
    let valofSub=parseFloat(subtotal.innerHTML.split(" ")[0]);
}

function removefromStorage(_productID)
{
   
    let cartItems=JSON.parse(sessionStorage.getItem('cartitems'));
    for(let i=0;i<cartItems.length;i++)
    {
      
        if(cartItems[i][0]==_productID)
        {
            console.log(cartItems[i][0]);
            console.log(_productID);
            cartItems.splice(i,1);
            
        }
    }
    
    sessionStorage.setItem('cartitems',JSON.stringify(cartItems));
}
function calculateTotal()
{
    
    let totalprice=0;
    let subtotals=document.getElementsByClassName('subtotal');
    for(subtotal of subtotals)
    {
        totalprice+=parseFloat(subtotal.innerHTML.split(" ")[0]);
    }
    document.getElementById("totalAmount").textContent = "Total: " + (totalprice>0?totalprice + " ,-":"");
}

function calculateCart()
{
    let cart=0;
    for(quantity of document.getElementsByClassName('form-control text-center'))
    {
        cart+=parseInt(quantity.value);
    }
    
   cart= cart>0?cart:"";
    sessionStorage.setItem('cartNumbers',cart);
    document.getElementById('cartAmount').textContent=cart;
}

function removebuttonevent(target,productID)
{

    while(target.className!="items")
        target=target.parentElement;

    target.remove();
    removefromStorage(productID);
    calculateTotal();
    calculateCart();
}
function quantityevent(item,target,productID)
{
    // console.log(target.value%1);
    if(target.value<=0 || target.value % 1 != 0)
    {
        target.value=1;
    }

   let cartItems= JSON.parse(sessionStorage.getItem('cartitems'));
   
   for(let i=0;i<cartItems.length;i++)
   {

        if(cartItems[i][0]==productID)
        {
            console.log(cartItems[i]);
            console.log(productID);
            cartItems[i][4]=target.value;
            item.getElementsByClassName('subtotal')[0].innerHTML=cartItems[i][2]*target.value + " ,-";
            sessionStorage.setItem('cartitems',JSON.stringify(cartItems));
            break;
        }
   }
  
   calculateTotal();
   calculateCart();

}
function generatecartItems()
{
    let cart= document.getElementsByClassName('cartbody')[0];
   
        let cartItems=JSON.parse(sessionStorage.getItem('cartitems'));
        if(cartItems)
        {
        for(let i=0;i<cartItems.length;i++)
        {
            // generating html
              let newitem= document.createElement('tr');
              newitem.id=cartItems[i][0];
              newitem.className='items';
              newitem.innerHTML=generatecartHTML(cartItems[i][2],cartItems[i][1],cartItems[i][3],cartItems[i][0],cartItems[i][4]);
              cart.appendChild(newitem);

             //removebutton eventlistener
             newitem.getElementsByClassName('btn btn-danger btn-sm')[0].addEventListener('click',function(event){
             removebuttonevent(event.target,cartItems[i][0]);});
               
             // quantity eventlistener
             newitem.getElementsByClassName('form-control text-center')[0].addEventListener('change',function(event){
             quantityevent(newitem,event.target,cartItems[i][0]);})
            
        }

    calculateTotal();
    }
}

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

// funktion der giver sommer og vinter tid til datoen på ordren
function dst() {
    Date.prototype.stdTimezoneOffset = function () {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    
    Date.prototype.isDstObserved = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }
    
    var today = new Date();
    if (today.isDstObserved()) { 
        alert ("Daylight saving time!");
    }

    return today;
}
//giver alert efter checkout
let checkout = document.getElementById('checkout')

        checkout.addEventListener('click', async function(event) {   
            let userID=sessionStorage.getItem('UserID');
            if(userID!=null)     
            { 
            let date = (dst().toDateString() + ", " + dst().toTimeString());
            let items = document.getElementsByClassName('items');
            let arr=[];
            // produkter
            for(item of items)
            {
                let id= parseInt(item.getElementsByClassName('productID')[0].innerHTML);
                let amount= parseInt(item.getElementsByClassName('form-control text-center')[0].value);
                let productName=(item.getElementsByClassName('nomargin')[0].innerHTML);
                arr.push({id,amount,productName});
            }

            let orderNumber = await get('/orders');
            let completedOrders = await get('/completedOrders');
            if((orderNumber.length+completedOrders.length)>0 )
                orderNumber = parseInt(completedOrders.length+orderNumber.length) +1;
            else
                orderNumber=1;
            await post('/orders',{
                orderNumber,date,userID,"products":arr
            });
            sessionStorage.removeItem('cartitems');
            sessionStorage.removeItem('cartNumbers');
            location.reload();
        }
        else alert("du er ikke logget ind ...");
        })


generatecartItems();
