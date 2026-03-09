/* LOGIN */
function goHome(){
window.location="explore.html"
}

function goMenu(){
document.getElementById("coffeeContainer").scrollIntoView()
}

function goItems(){
document.getElementById("coffeeContainer").scrollIntoView()
}

function goCart(){
window.location="cart.html"
}
function login(){

let user=document.getElementById("user").value
let pass=document.getElementById("pass").value

if(user==="bhargava" && pass==="zoro"){

window.location="explore.html"

}else{

alert("Wrong Login")

}

}


/* COFFEE DATA */

const coffees=[

{name:"Espresso",price:120,image:"https://images.unsplash.com/photo-1511920170033-f8396924c348"},
{name:"Latte",price:150,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"},
{name:"Cappuccino",price:160,image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
{name:"Americano",price:130,image:"https://images.unsplash.com/photo-1521305916504-4a1121188589"},
{name:"Mocha",price:170,image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735"},
{name:"Flat White",price:180,image:"https://images.unsplash.com/photo-1470337458703-46ad1756a187"},
{name:"Macchiato",price:150,image:"https://images.unsplash.com/photo-1509785307050-d4066910ec1e"},
{name:"Irish Coffee",price:200,image:"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"},
{name:"Cold Brew",price:160,image:"https://images.unsplash.com/photo-1498804103079-a6351b050096"},
{name:"Iced Latte",price:170,image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},

{name:"Caramel Latte",price:180,image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c"},
{name:"Vanilla Latte",price:180,image:"https://images.unsplash.com/photo-1485808191679-5f86510681a2"},
{name:"Hazelnut Coffee",price:170,image:"https://images.unsplash.com/photo-1494314671902-399b18174975"},
{name:"Chocolate Coffee",price:190,image:"https://images.unsplash.com/photo-1459755486867-b55449bb39ff"},
{name:"Turkish Coffee",price:200,image:"https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"},
{name:"Café Cubano",price:210,image:"https://images.unsplash.com/photo-1498804103079-a6351b050096"},
{name:"Affogato",price:220,image:"https://images.unsplash.com/photo-1470337458703-46ad1756a187"},
{name:"Café au Lait",price:150,image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735"},
{name:"Vienna Coffee",price:200,image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c"},
{name:"Iced Mocha",price:190,image:"https://images.unsplash.com/photo-1485808191679-5f86510681a2"},

{name:"Caramel Macchiato",price:210,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"},
{name:"Pumpkin Spice Latte",price:230,image:"https://images.unsplash.com/photo-1511920170033-f8396924c348"},
{name:"White Chocolate Mocha",price:220,image:"https://images.unsplash.com/photo-1459755486867-b55449bb39ff"},
{name:"Black Coffee",price:110,image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
{name:"Honey Latte",price:190,image:"https://images.unsplash.com/photo-1509785307050-d4066910ec1e"},
{name:"Almond Latte",price:200,image:"https://images.unsplash.com/photo-1470337458703-46ad1756a187"},
{name:"Oat Milk Latte",price:200,image:"https://images.unsplash.com/photo-1494314671902-399b18174975"},
{name:"Coconut Coffee",price:210,image:"https://images.unsplash.com/photo-1485808191679-5f86510681a2"},
{name:"Caramel Cold Brew",price:220,image:"https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"},
{name:"Double Espresso",price:180,image:"https://images.unsplash.com/photo-1511920170033-f8396924c348"}

]

let container=document.getElementById("coffeeContainer")

if(container){

coffees.forEach((c,i)=>{

container.innerHTML+=`

<div class="coffee-card">

<img src="${c.image}">

<h3>${c.name}</h3>

<p>₹${c.price}</p>

<button onclick="addToCart(${i})">Add To Cart</button>

</div>

`

})

}


/* CART */

function addToCart(i){

let cart=JSON.parse(localStorage.getItem("cart"))||[]

cart.push(coffees[i])

localStorage.setItem("cart",JSON.stringify(cart))

alert("Added to cart")

}

function openCart(){

window.location="cart.html"

}


/* CART PAGE */

let cartItems=document.getElementById("cartItems")

if(cartItems){

let cart=JSON.parse(localStorage.getItem("cart"))||[]

let total=0

cart.forEach(c=>{

cartItems.innerHTML+=`

<div class="coffee-card">

<img src="${c.image}">

<h3>${c.name}</h3>

<p>₹${c.price}</p>

</div>

`

total+=c.price

})

document.getElementById("total").innerText="Total ₹"+total

}


/* PAYMENT */

function checkout(){

window.location="payment.html"

}

function pay(){

let name=document.getElementById("name").value
let mobile=document.getElementById("mobile").value

let cart=JSON.parse(localStorage.getItem("cart"))||[]

let total=0

cart.forEach(c=>total+=c.price)

/* store receipt data */

localStorage.setItem("receiptName",name)
localStorage.setItem("receiptMobile",mobile)
localStorage.setItem("receiptItems",JSON.stringify(cart))
localStorage.setItem("receiptTotal",total)

/* send order to MongoDB */

fetch("/order",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({

customer:name,
mobile:mobile,
items:cart,
total:total

})

})

.then(()=>{

/* clear cart */

localStorage.removeItem("cart")

/* go to receipt page */

window.location="receipt.html"

})

}
/* RECEIPT PAGE */

let rname = document.getElementById("rname");

if(rname){

document.getElementById("rname").innerText =
localStorage.getItem("receiptName");

document.getElementById("rmobile").innerText =
localStorage.getItem("receiptMobile");

let items = JSON.parse(localStorage.getItem("receiptItems")) || [];

let container = document.getElementById("ritems");

let total = localStorage.getItem("receiptTotal");

items.forEach(i=>{

container.innerHTML += `<p>${i.name} - ₹${i.price}</p>`;

});

document.getElementById("rtotal").innerText = "Total: ₹" + total;

}