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
        });
    }
}

function cutcards()
{
   let cutcard= document.getElementsByClassName("selectorKlip")[0];
   console.log(cutcard)
   let priceCutcard=document.getElementById("prisKlippeKort"); 
   console.log(priceCutcard);
   for(let i=10;i<31;i+=10)
   {
       let option = document.createElement('option');
       option.textContent=i;
       option.className="cutcardOption";
       cutcard.appendChild(option);
   }
   cutcard.addEventListener('change',()=>
   {
       let price=sessionStorage.getItem('price');
       if(price)
        priceCutcard.textContent=parseInt(cutcard.value)*price;
   })
   
}

addproducts()
cutcards();