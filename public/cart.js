

// for (let i=0; i < addToCartButtons.length; i++) {
//     addToCartButtons[i].addEventListener('click', () => {
//         cartNumbers();
//     })
// }

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

/* function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.getElementById('cartAmount').textContent = productNumbers;
    }
} */

function generatecartHTML(price,title,imgsrc,_productID)
{
    let theprice=parseFloat(price);
    let toreturn =` 
    <td>
        <div class="row">
            <div class="col-lg-2 Product-img">
                <img id = "productImage"src="${imgsrc}" alt="..." class="img-responsive"/>
            </div>
            <div class="col-lg-10">
                <h4 class="nomargin" id = "productName">${title}</h4>
            </div>
                <p class = "productID" style="display: none;">${_productID}</p> 
        </div>
    </td>
    <td id = "productPrice"> ${theprice},-</td>
    <td data-th="Quantity">
        <input id= "productAmount" type="number" class="form-control text-center" value="1">
    </td>
    <td class = "subtotal">${theprice},-</td>
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
function removefromStorage(price,titel,imgsrc,_productID)
{
    let cartItemString=sessionStorage.getItem('cartitems');
    let value= cartItemString.replace(price+" ,-splithere"+titel+"splithere"+imgsrc + "splithere" + _productID +"__","");
  
    sessionStorage.setItem('cartNumbers',parseInt(sessionStorage.getItem('cartNumbers')-1));
    sessionStorage.setItem('cartitems',value);
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
function generatecartItems()
{
    let cart= document.getElementsByClassName('cartbody')[0];
    let buyString=sessionStorage.getItem('cartitems');
    if(buyString!=null)
    {
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
    

    for(let i=0;i<finalstring.length-1;i++)
    {
        let newitem=document.getElementById(finalstring[i][1]);
        if(newitem==null)
        {
            //create tr Innerhtml og append til cart
            newitem= document.createElement('tr');
            newitem.id=finalstring[i][1];
            newitem.className='items';
            newitem.innerHTML=generatecartHTML(finalstring[i][0],finalstring[i][1],finalstring[i][2],finalstring[i][3]);
            cart.appendChild(newitem);
            
            //removebutton eventlistener
            newitem.getElementsByClassName('btn btn-danger btn-sm')[0].addEventListener('click',function(event){
                let target=event.target;
                while(target.className!="items")
                    target=target.parentElement;

                target.remove();
                removefromStorage(finalstring[i][0],finalstring[i][1],finalstring[i][2],finalstring[i][3]);
                calculateTotal();
            });

            // quantity eventlistener
            newitem.getElementsByClassName('form-control text-center')[0].addEventListener('change',function(event){
                console.log(event.target.value);
                if(event.target.value<=0)
                    event.target.value=1;
                newitem.getElementsByClassName('subtotal')[0].innerHTML=finalstring[i][0]*event.target.value + " ,-";
                calculateTotal();
            })
        }
        else
        {
            // tæller value op på  item i cart
            let productAmount= newitem.getElementsByClassName('form-control text-center')[0];
            productAmount.value=(parseInt(productAmount.value)+1);
            let subtotal=newitem.getElementsByClassName('subtotal')[0];
            let valofSub=parseFloat(subtotal.innerHTML.split(" ")[0]);
            subtotal.innerHTML=parseFloat(finalstring[i][0])*parseInt(productAmount.value) + " ,-";
            
        }

        
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
//giver alert efter checkout
let checkout = document.getElementById('checkout')

        checkout.addEventListener('click', async function(event) {         
            let date = new Date();
            let userID=1;
            let items = document.getElementsByClassName('items');
            let arr=[];
            for(item of items)
            {
                let id= parseInt(item.getElementsByClassName('productID')[0].innerHTML);
                let amount= parseInt(item.getElementsByClassName('form-control text-center')[0].value);
                arr.push({id,amount});
            }
           let hej="Hej"
            let orders = await get('/orders');
            console.log(orders);
            await post('/orders',{
                date,userID,arr
            });

        })

    



// onLoadCartNumbers();

// checkout();

generatecartItems();
