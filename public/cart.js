

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

function generatecartHTML(price,title,imgsrc)
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
        </div>
    </td>
    <td id = "productPrice"> ${theprice} ,- </td>
    <td data-th="Quantity">
        <input id= "productAmount" type="number" class="form-control text-center" value="1">
    </td>
    <td class = "subtotal">${theprice} ,-</td>
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
function removefromStorage(price,titel,imgsrc)
{
    let cartItemString=localStorage.getItem('cartitems');
    let cartNumbers=localStorage.getItem('cartNumbers');
    
    let value= cartItemString.replaceAll(price+" ,-splithere"+titel+"splithere"+imgsrc+"__","");
    //  console.log(price+" ,-splithere"+titel+"splithere"+imgsrc+"__","");
    // cartNumbers=parseInt(cartNumbers);
   
    localStorage.setItem('cartitems',value);
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
    

    for(let i=0;i<finalstring.length-1;i++)
    {
        let newitem=document.getElementById(finalstring[i][1]);
        if(newitem==null)
        {
            newitem= document.createElement('tr');
            newitem.id=finalstring[i][1];
            newitem.className='items';
            newitem.innerHTML=generatecartHTML(finalstring[i][0],finalstring[i][1],finalstring[i][2]);
            cart.appendChild(newitem);
            // newitem.getElementsByClassName('form-control text-center')[0].addEventListener('change',addItemAmount(parseFloat(finalstring[i][0]),newitem.getElementsByClassName('subtotal')[0]))
            newitem.getElementsByClassName('btn btn-danger btn-sm')[0].addEventListener('click',function(event){
                let target=event.target.parentElement.parentElement;
                target.remove();
                removefromStorage(finalstring[i][0],finalstring[i][1],finalstring[i][2]);
                calculateTotal();
            });
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

generatecartItems();
