

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

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
  });

  document.getElementById('addButton').addEventListener('click',function(){postProduct();})
 
  var btnUpload = $("#upload_file"),
  btnOuter = $(".button_outer");

btnUpload.on("change", function(e){
  var ext = btnUpload.val().split('.').pop().toLowerCase();
  if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
      $(".error_msg").text("Not an Image...");
  } else {
      $(".error_msg").text("");
      btnOuter.addClass("file_uploading");
      setTimeout(function(){
          btnOuter.addClass("file_uploaded");
      },3000);
      var uploadedFile = URL.createObjectURL(e.target.files[0]);
      console.log(uploadedFile);
      setTimeout(function(){
          $("#uploaded_view").append('<img src="'+uploadedFile+'" />').addClass("show");
      },3500);
  }
});
$(".file_remove").on("click", function(e){
  $("#uploaded_view").removeClass("show");
  $("#uploaded_view").find("img").remove();
  btnOuter.removeClass("file_uploading");
  btnOuter.removeClass("file_uploaded");
});
function generateOrderHTML(order,productID,amount)
{

    let toreturn =` 
    <table class="table table-hover border bg-white">
        <tbody class="orderbody">
        <tr>
        <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order._id}</h4>
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
function generateCompletedOrderHTML(order,productID,amount)
{

    let toreturn =` 
    <table class="table table-hover border bg-white">
        <tbody class="orderbody">
        <tr>
        <td>
        <div class="row">
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${order._id}</h4>
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
        </tfoot>
    </table>

    `;
    return toreturn;
}
{/* <td> class = "amount">${order.products}</td>
<td> class = "customer">${order.userID}</td> */}

async function moveTocompletedOrders(orderID)
{
    if(confirm(`er du sikker på at du vil flytte ${orderID} til færdige ordre?`))
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
       
        let productIDs=[];
        let productAmount=[];
        for(product of orders[i].products)
        {
            productIDs.push(product.id);
            productAmount.push(product.amount);

        }
        div.innerHTML= generateOrderHTML(orders[i],productIDs,productAmount);
        orderItems.appendChild(div);
        div.getElementsByClassName('btn btn-success')[0].addEventListener('click',async function(event){
            moveTocompletedOrders(orders[i]._id);
        });
    }
    // document.getElementsByClassName('btn btn-success').addEventListener('click',async function(){moveTocompletedOrders(orderID)});
}
async function completedorders()
{
    let orderItems=document.getElementById('completedorders');
   
    for(order of await get('/completedorders'))
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
        div.innerHTML= generateCompletedOrderHTML(order,productIDs,productAmount);
        orderItems.appendChild(div);
        
    }
    // document.getElementsByClassName('btn btn-success').addEventListener('click',async function(){moveTocompletedOrders(orderID)});
}
orders();
completedorders();