async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function addproducts()
{
    let products= await get('/products');
    let productView=document.getElementById('productView');
    for(let i=0;i<products.length;i++)
    {
        let newBtn=document.createElement('button');
        newBtn.className="dropdown-item"
        newBtn.type="button"
        newBtn.innerHTML=products[i].productName;
        productView.appendChild(newBtn);
        newBtn.addEventListener('click',()=>
        {
            sessionStorage.setItem('price',products[i].productPrice);
            document.getElementById('dropdownMenu').textContent=products[i].productName;
            updateprice();
        });
    }
}
function updateprice()
{
    let cutcard= document.getElementById("selectorKlip").value;
    let priceCutcard=document.getElementsByClassName("prisKlippekort")[0]; 
    let price=sessionStorage.getItem('price');

  
    if(price  && cutcard)
    {
         priceCutcard.value=(parseInt(cutcard)*parseInt(price))*0.9;
    }
}

function cutcards()
{
   let cutcard= document.getElementById("selectorKlip");
   for(let i=0;i<31;i+=10)
   {
      
       let option = document.createElement('option');
       if(i>0)
            option.textContent=i;
       else
            option.textContent=""; 

       option.className="cutcardOption";
       cutcard.appendChild(option);
   }
   cutcard.addEventListener('change',()=>
   {
       updateprice();
   })
   
}


//adder til kurven og kontrollere om den allerede eksistere
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
function cartItems(title,price)
{
    let cartitems=JSON.parse(sessionStorage.getItem('cartitems'));
    if(cartitems==null)
        cartitems=[];

    let found=false;
    let i=0;
   
    for(;i<cartitems.length;i++)
    {
       
        if(cartitems[i][1]==title)
        {
           
            found=true;
            break;
        }
    }
    if(found)
    {
        cartitems[i][4]=parseInt(cartitems[i][4])+1;
    }
    else
    {
        cartitems.push(["999",title,price,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTwM1G5mCdpQTK1nacn94IS-MEarxlSsqu_w&usqp=CAU",1]);
    }
        sessionStorage.setItem('cartitems',JSON.stringify(cartitems));
        cartNumbers();
}


document.getElementById('btnAdd').addEventListener('click',()=>
{
 
    let priceCutcard=document.getElementsByClassName("prisKlippekort")[0]; 
    let klip=document.getElementById('selectorKlip').value;
    let product=document.getElementById("dropdownMenu").textContent + "-Klippekort X" + klip;
    
    if(priceCutcard && klip && product)
    {
        

       
        cartItems(product,priceCutcard.value);
        
        location.reload();
    }
    else
        alert("Du mangler at udfylde et, eller flere fælter");
    
    
})

addproducts()
cutcards();