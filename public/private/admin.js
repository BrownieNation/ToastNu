

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
async function move(url, objekt) {
    const respons = await fetch(url, {
        method: "MOVE",
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
    let img = document.images.src("../img.product/");
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
  document.getElementById('addButton').addEventListener('click',function(){postProduct();})

function generateOrderHTML(order,productID,amount)
{

    let toreturn =` 
    <table class="table table-hover border bg-white">
        <tbody class="orderbody">
        <tr>
        <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order.orderNumber}</h4>
            </div>
        </div>
    </td>
    <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${productID}</h4>
            </div>
        </div>
    </td>
    <td>
    <div class="row">
        <div class="col-lg-10">
            <h4 class="nomargin" id = "productName">${amount}</h4>
        </div>
    </div>
</td>
    <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order.userID}</h4>
            </div>
        </div>
    </td>
    

    <td class="actions" data-th="" style="width:10%;">
        <button type="button" class="btn btn-success">Udført</button>								
    </td>
        </tfoot>
    </table>

    `;
    return toreturn;
}
function generateCompletedOrderHTML(order,productNames,amount)
{

    let toreturn =` 
    <table class="table table-hover border bg-white">
        <tbody class="orderbody">
        <tr>
        <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order.orderNumber}</h4>
            </div>
        </div>
    </td>
    <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${productNames}</h4>
            </div>
        </div>
    </td>
    <td>
    <div class="row">
        <div class="col-lg-10">
            <h4 class="nomargin" id = "productName">${amount}</h4>
        </div>
    </div>
</td>
    <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order.userID}</h4>
            </div>
        </div>
    </td>
        </tfoot>
    </table>

    `;
    return toreturn;
}
{/* <td> class = "amount">${order.products}</td>
<td> class = "customer">${order.userID}</td> */}

async function moveTocompletedOrders(orderID)
{
    if(confirm(`er du sikker på at du vil flytte ${orderNumber} til færdige ordre?`))
    {
        move(`/orders/${orderID}`);
        alert("Ordre er noteret færdig");
        
    }
}
async function orders()
{
    let orderItems=document.getElementById('orderItems');
   let orders= await get('/orders');
    for(let i=0;i<orders.length;i++)
    {
        let div = document.createElement('div');
        div.className="col-lg-12 pl-3 pt-3";
       
        let productNames=[];
        let productAmount=[];
        for(product of orders[i].products)
        {
            productNames.push(product.productName);
            productAmount.push(product.amount);

        }
        div.innerHTML= generateOrderHTML(orders[i],productNames,productAmount);
        orderItems.appendChild(div);
        div.getElementsByClassName('btn btn-success')[0].addEventListener('click',async function(event){
            moveTocompletedOrders(orders[i]._id);
        });
    }
    // document.getElementsByClassName('btn btn-success').addEventListener('click',async function(){moveTocompletedOrders(orderID)});
}
async function completedOrders()
{
    let orderItems=document.getElementById('completedOrders');
   
    for(order of await get('/completedOrders'))
    {
        
        let div = document.createElement('div');
        div.className="col-lg-12 pl-3 pt-3";
       
        let productIDs=[];
        let productAmount=[];
        for(product of order.products)
        {
            
            productIDs.push(product.id);
            productAmount.push(product.amount);

        }
        div.innerHTML= generateCompletedOrderHTML(orderNumber,order,productIDs,productAmount);
        orderItems.appendChild(div);
        
    }
    // document.getElementsByClassName('btn btn-success').addEventListener('click',async function(){moveTocompletedOrders(orderID)});
}
orders();
completedOrders();

