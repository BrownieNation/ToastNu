var checkout = document.getElementById('checkout')
var pImage = document.getElementById('productImage')
var pName = document.getElementById('productName')
var pDescription = document.getElementById('productDescription')
var pPrice = document.getElementById('ProductPrice')
var pAmount = document.getElementById('productAmount')
var total = document.getElementById('totalAmount')



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



function generatecartHTML(title,imgsrc, amount, customer)
{

    let toreturn =` 
    <table class="table table-hover border bg-white">
        <thead>
              <tr>
                <th>Produkt</th>
                <th style="width:10%;">Antal</th>
                <th>Kunde</th>
                <th></th>
              </tr>
        </thead>
        <tbody class="cartbody">
        <tr>
        <td>
        <div class="row">
            <div class="col-lg-2 Product-img">
                <img id = "productImage" src="${imgsrc}" alt="..." class="img-responsive"/>
            </div>
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${title}</h4>
            </div>
        </div>
    </td>
    <td> class = "amount">${amount}</td>
    <td> class = "customer">${customer}</td>
    <td class="actions" data-th="" style="width:10%;">
        <button id="buttonRefresh" class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
        <button id="buttonDelete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
    </td>
        </tr>
        </tbody>
        <tfoot>
            <tr>
                <td><a href="index.html" class="btn btn-warning text-white"><i class="fa fa-angle-left"></i> Fortsæt med at handle</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <!-- Rød knap her "Ryd kurv" -->
                <td id = "totalAmount" class="hidden-xs text-center" style="width:10%;" id= "total"><strong>Total : </strong></td>
                <td><a href="#" class="btn btn-success btn-block" id="checkout">Checkud <i class="fa fa-angle-right"></i></a></td>
            </tr>
        </tfoot>
    </table>

    `;
    return toreturn;
}


async function main()
{
    let ordertable= document.getElementsByClassName('orderTable')[0];
    let orders= await get("/orders");
    console.log(orders);
    for(order of orders)
    {
        let div = document.createElement('div');
        div.className="col-lg-12 pl-3 pt-3";
        div.innerHTML=generatecartHTML(order.title,order.imgsrc,order.amount,order.customer);
        ordertable.appendChild(div);
    }
}

main();
