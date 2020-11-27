

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
                <h4 class="nomargin" id = "productName">${title}</h4>
            </div>
                <p class = "productID" style="display: none;">${_productID}</p> 
        </div>
    </td>
    <td id = "productPrice"> ${theprice},-</td>
    <td data-th="Quantity">
        <input id= "productAmount" type="number" class="form-control text-center" value="${amount}">
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
function removefromStorage(price,titel,imgsrc,_productID,amount)
{
    let cartItemString=sessionStorage.getItem('cartitems');
    let value= cartItemString.replace(price+" ,-splithere"+titel+"splithere"+imgsrc + "splithere" + _productID + "splithere" + amount + "__","");
  
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
            newitem.innerHTML=generatecartHTML(finalstring[i][0],finalstring[i][1],finalstring[i][2],finalstring[i][3],finalstring[i][4]);
            cart.appendChild(newitem);
            
            //removebutton eventlistener
            newitem.getElementsByClassName('btn btn-danger btn-sm')[0].addEventListener('click',function(event){
                let target=event.target;
                while(target.className!="items")
                    target=target.parentElement;

                target.remove();
                removefromStorage(finalstring[i][0],finalstring[i][1],finalstring[i][2],finalstring[i][3],finalstring[i][4]);
                calculateTotal();
            });

            // quantity eventlistener
            newitem.getElementsByClassName('form-control text-center')[0].addEventListener('change',function(event){
              
                if(event.target.value<=0)
                {
                    event.target.value=1;
                   
                }
               console.log(event.target.value);
              
               let newValue= sessionStorage.getItem('cartitems').replace((finalstring[i][0] + " ,-splithere" + finalstring[i][1] + "splithere" + finalstring[i][2] + "splithere" + finalstring[i][3] + "splithere" + event.target.defaultValue + "__"),(finalstring[i][0] + " ,-splithere" + finalstring[i][1] + "splithere" + finalstring[i][2] + "splithere" + finalstring[i][3] + "splithere" + event.target.value + "__"));
                console.log(newValue);
               sessionStorage.setItem('cartitems',newValue);
               newitem.getElementsByClassName('subtotal')[0].innerHTML=finalstring[i][0]*event.target.value + " ,-";
               event.target.defaultValue=event.target.value;
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
            let userID=sessionStorage.getItem('UserID');
            if(userID!=null)     
            { 
            let date = new Date();
           
            let items = document.getElementsByClassName('items');
            let arr=[];
            for(item of items)
            {
                let id= parseInt(item.getElementsByClassName('productID')[0].innerHTML);
                let amount= parseInt(item.getElementsByClassName('form-control text-center')[0].value);
                arr.push({id,amount});
            }
           
            await post('/orders',{
                date,userID,"products":arr
            });
            sessionStorage.removeItem('cartitems');
            sessionStorage.removeItem('cartNumbers');
            location.reload();
        }
        else alert("du er ikke logget ind ...");
        })

        



// onLoadCartNumbers();

// checkout();


generatecartItems();


