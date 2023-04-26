let items = [
  {
    id: 1,
    imageSrc: "images/cart-item.png",
    title: "Snow® At Home Teeth Whitening Kit",
    color: "Polar Blue",
    discount: true,
    qty: 1,
    oldPrice: 89.99,
    price: 59.99,
  },
  {
    id: 2,
    imageSrc: "images/cart-item-2.jpeg",
    title: "Snow® At Home Teeth Whitening Kit",
    color: null,
    discount: false,
    qty: 1,
    oldPrice: 0,
    price: 79.99,
  },
];

let subtotalItems = 0;
let subtotalPrice = 0;

// [free shipping, mystery gift 1, mystery gift 2]
const tiers = [100, 200, 300];

// Show/Hide "View Cart" Button
const showViewCartButton = false;
!showViewCartButton &&
  document.getElementById("viewCartButton").classList.add("hidden");

// Show/Hide Afterpay option
const afterpayShow = true;
const afterpayPosition = "bottom"; // 'top' or 'bottom'
const afterpayText = `<img src="images/afterpay.svg" alt="" /> available for orders over $35`;
if (afterpayShow) {
  if (afterpayPosition === "bottom") {
    document.getElementById("afterpayBottom").innerHTML = afterpayText;
  }
  if (afterpayPosition === "top") {
    document.getElementById("afterpayTop").innerHTML = afterpayText;
  }
}

// Upsell show/hide options
const upsellList = true;
const upsellCarousel = true;
!upsellList && document.querySelector(".upsell").classList.add("hidden");
!upsellCarousel && document.querySelector(".upsell2").classList.add("hidden");

const cartContainer = document.getElementById("cartItems");
drawCartItems(items);

function drawCartItems(items) {
  cartContainer.innerHTML = "";

  if (items.length === 0) {
    cartContainer.innerHTML += `
      <div class="empty-cart">
        <div class="title">Your Cart is empty!</div>
        <div class="subtitle">Add your favorite items to your cart.</div>
        <button class="btn-primary">Shop Now</button>
      </div>
    `;
  } else {
    items.map(
      (item) =>
        (cartContainer.innerHTML += `
          <div class="cart-item">
            <div class="image">
              <img src="${item.imageSrc}" alt="" />
            </div>
            <div class="title-qty">
              <div>
                <strong>${item.title}</strong>
              </div>
              ${item.color ? `<div class="color">${item.color}</div>` : ""}
              ${
                item.discount === true
                  ? `<div class="discount">Instant discount!</div>`
                  : ""
              }
              <div class="qty">
                <input
                  type="number"
                  name=""
                  id=""
                  value="${item.qty}"
                  onchange="changeQty(this, ${item.id})"
                />
              </div>
            </div>
            <div class="clear-price">
              <div class="clear">
                <button onclick="removeItem(${item.id})"></button>
              </div>
              ${
                item.discount === true
                  ? `<div class="discount">$${roundPrice(
                      item.qty * item.price
                    )}</div>`
                  : ""
              }
              <div class="price">
                ${
                  item.discount === true
                    ? `<s>$${roundPrice(item.qty * item.oldPrice)}</s>`
                    : `$${roundPrice(item.qty * item.price)}`
                }
              </div>
            </div>
          </div>
      `)
    );
  }

  countSubtotal(items);
  const barContainer2 = document.querySelector("#upsell_prev_prog").querySelector('#progressBar');
  const ranges = document.querySelectorAll(".upsell__cart-gift-item");
  var amt = [];
  for(var i = 0; i < ranges.length; i++){
      amt.push(ranges[i].getAttribute('id')); 
      var id = ranges[i].getAttribute('id');
      if(subtotalPrice >= id){
        document.getElementById(""+id+"").querySelector(".upsell__cart-icon").classList.add("active");
      }else{
        document.getElementById(""+id+"").querySelector(".upsell__cart-icon").classList.remove("active");
      }
  }
  const max = Math.max(...amt);
 
  var pertcnt = subtotalPrice/max*100;
  barContainer2.style = `width: `+pertcnt+`%;`;
  // countTiers(subtotalPrice, tiers);
}

function addItem() {
  items.push({
    id: Math.random(),
    imageSrc: "images/cart-item.png",
    title: "The Magic Teeth Whitening Strips®",
    color: "Black",
    discount: false,
    qty: 1,
    oldPrice: 0,
    price: 79.99,
  });
  drawCartItems(items);
}

function changeQty(e, id) {
  const item = items.find((item) => item.id === id);
  item.qty = parseInt(e.value);
  drawCartItems(items);
}

function removeItem(id) {
  const filteredItems = items.filter((item) => item.id !== id);
  items = filteredItems;
  drawCartItems(items);
}

function cleanCart(event) {
  event.preventDefault();
  items = [];
  drawCartItems(items);
}

function showOptions(el) {
  const cartItem = el.closest(".item");
  const addBtn = cartItem.querySelector(".add-btn");
  const optionsSelect = cartItem.querySelector(".options-select");

  addBtn.classList.remove("hidden");
  optionsSelect.classList.remove("hidden");
  el.classList.add("hidden");
}

function countSubtotal(items) {
  const itemsContainer = document.getElementById("subtotalItems");
  const priceContainer = document.getElementById("subtotalPrice");

  subtotalItems = items.reduce((acc, item) => acc + item.qty, 0);
  subtotalPrice = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  itemsContainer.innerHTML = `Subtotal (${subtotalItems} item${
    subtotalItems === 1 ? "" : "s"
  })`;
  priceContainer.innerHTML = `<span class="discount">$${roundPrice(
    subtotalPrice
  )}</span><s>${roundPrice(subtotalPrice * 1.2)}</s>`;
}

function roundPrice(num) {
  return num.toFixed(2);
}


//////////////////////////

function prevSlide(elem){
  var parnt =  elem.parentNode.parentNode.querySelector('.crousl');
  var prevslide = parnt.querySelectorAll(".upsell__cart-upsell2-item");
  var last = prevslide[prevslide.length- 1].innerHTML;
  var nxt = `<div class='item upsell__cart-upsell2-item'>`+last+`</div>`;
  parnt.classList.add("upsell_animaterev");
  setTimeout(function(){
      parnt.classList.remove("upsell_animaterev");
      parnt.insertAdjacentHTML('afterbegin',nxt);
      prevslide[prevslide.length- 1].remove();
  },300);
}

function nextSlide(elem){
  var parnt = elem.parentNode.parentNode.querySelector('.crousl');

  var neslide = parnt.firstChild.innerHTML;
  var nxt = `<div class='item upsell__cart-upsell2-item'>`+neslide+`</div>`;
  parnt.classList.add("upsell_animate");
  setTimeout(function(){
    parnt.classList.remove("upsell_animate");
    parnt.insertAdjacentHTML('beforeend',nxt);
    parnt.querySelector(".upsell__cart-upsell2-item").remove();
      
  },300);

}

function preview(event){
fetch('https://geolocation-db.com/json/')
.then(function (response) {
    return response.json();
})
.then(function (payload) {
  window.country = payload.country_code;
});

function allwdgt(){

fetch('https://cart.brandlift.io/api/prevwidget/'+event.data.store+'')
.then(function (response) {
    return response.json();
})
.then(function (payload) {
  console.log(payload);
  var upselstyle = '';
  if(payload.widgets){
  for(var i=0;i<payload.widgets.length;i++){
      var wtype = payload.widgets[i].type;
      if(wtype == 'recommended_full_page)'){

         var recmDation = document.getElementById("upsell_prev_recom");
         document.querySelector('.crsl button').remove()
          document.querySelector('.upsell_prev_recom.title').innerHTML = payload.widgets[i].name;
          if(payload.widgets[i].images.fixed_height == true){
            upselstyle += '.upsell__cart-image img{height:'+payload.widgets[i].images.image_height+"px;}"
          }
          if(payload.widgets[i].images.fixed_width == true){
            upselstyle += '.upsell__cart-upsell2-item{width:'+payload.widgets[i].images.image_width+"px;}"
          }
          if(payload.widgets[i].images.image_radius_unit == "Pixels"){
            upselstyle += '.upsell__cart-upsell2-item{border-radius:'+payload.widgets[i].images.image_radius+"px;}";
            upselstyle += '.upsell__cart-image img{border-radius:'+payload.widgets[i].images.image_radius+"px;}"
          }
          if(payload.widgets[i].images.image_radius_unit == "Percentage"){
            upselstyle += '.upsell__cart-upsell2-item{border-radius:'+payload.widgets[i].images.image_radius+"%;}";
            upselstyle += '.upsell__cart-image img{border-radius:'+payload.widgets[i].images.image_radius+"%;}"
          }
          var allpro = payload.allpro.products;
          recmDation.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          
          allpro.map(
          (item) =>
              ( 
                  recmDation.innerHTML += `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
              ${item.images.length ? `<img src="${item.images[0].src}" alt="" width="auto" height="auto" loading="lazy" />` : noimg}
                  
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>${item.title}</strong>
                  </div>
                  <div class="upsell__cart-price">$${item.variants[0].price}</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="addItem(this)">Add</button>
                  </div>
              </div>
              </div>`));
              
              if(payload.widgets[i].layout.large_screens.display_style == 'grid'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += " @media only screen and (min-width:768px){ #upsell_prev_recom{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+payload.widgets[i].layout.large_screens.grid_columns+",1fr);}}";
                  upselstyle += custcss;
              } 
              if(payload.widgets[i].layout.large_screens.display_style == 'list'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += "#upsell_prev_recom{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
                
              }
              if(payload.widgets[i].layout.large_screens.display_style == "line"){
                  
                  if(payload.widgets[i].layout.large_screens.display_as_carousel == true){
                      var removelm = document.querySelector(".crousl .upsell_prvbtn");
                      if(removelm){        
                          removelm.remove();
                      }
                      document.querySelector('#upsell_prev_recom').classList.add('crousl');
                      var list = document.querySelector('#upsell_prev_recom');
                      list.parentNode.insertAdjacentHTML('beforeend','<div class="upsell_prvbtn"> <button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button></div>');
                      list.parentNode.classList.add("crousl")
                     
                    }else{
                    upselstyle += "div#upsell_prev_recom{overflow-x: scroll;}";
                  }
                  var custcss = payload.widgets[i].style;
                  upselstyle += custcss;
              }
      } 
      if(wtype == "featured_items"){
         var recmDation1 = document.getElementById("upsell_prev_featur");
          document.querySelector('.upsell_prev_featur.title').innerHTML = payload.widgets[i].name;
          var allpro = payload.allpro.products;
          recmDation1.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          allpro.map(
          (item) =>
              ( 
                recmDation1.innerHTML += `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
              ${item.images.length ? `<img src="${item.images[0].src}" alt="" width="auto" height="auto" loading="lazy" />` : noimg}
                  
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>${item.title}</strong>
                  </div>
                  <div class="upsell__cart-price">$${item.variants[0].price}</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="addItem(this)">Add</button>
                  </div>
              </div>
              </div>`));

              if(payload.widgets[i].layout.large_screens.display_style == 'grid'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += " @media only screen and (min-width:768px){ #upsell_prev_featur{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+payload.widgets[i].layout.large_screens.grid_columns+",1fr);}}";
                  upselstyle += custcss;
              } 
              if(payload.widgets[i].layout.large_screens.display_style == 'list'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += "#upsell_prev_featur{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
                
              }

              if(payload.widgets[i].layout.large_screens.display_style == "line"){
                  
                  if(payload.widgets[i].layout.large_screens.display_as_carousel == true){
                    var removelm = document.querySelector(".crousl .upsell_prvbtn");
                      if(removelm){        
                          removelm.remove();
                      }
                      document.querySelector('#upsell_prev_featur').classList.add('crousl');
                      var list = document.querySelector('#upsell_prev_featur');
                      list.parentNode.insertAdjacentHTML('beforeend','<div class="upsell_prvbtn"><button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button></div>');
                      list.parentNode.classList.add("crousl")
                    }else{
                    upselstyle += "div#upsell_prev_featur{overflow-x: scroll;}";
                  }
                  var custcss = payload.widgets[i].style;
                  upselstyle += custcss;
              }
      }
      if(wtype == "recently_viewed"){
         var recmDation1 = document.getElementById("upsell_prev_rcent");
          document.querySelector('.upsell_prev_rcent.title').innerHTML = payload.widgets[i].name;
          var allpro = payload.allpro.products;
          recmDation1.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          allpro.map(
          (item) =>
              ( 
                recmDation1.innerHTML += `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
              ${item.images.length ? `<img src="${item.images[0].src}" alt="" width="auto" height="auto" loading="lazy" />` : noimg}
                  
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>${item.title}</strong>
                  </div>
                  <div class="upsell__cart-price">$${item.variants[0].price}</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="addItem(this)">Add</button>
                  </div>
              </div>
              </div>`));

              if(payload.widgets[i].layout.large_screens.display_style == 'grid'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += " @media only screen and (min-width:768px){ #upsell_prev_rcent{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+payload.widgets[i].layout.large_screens.grid_columns+",1fr);}}";
                  upselstyle += custcss;
              } 
              if(payload.widgets[i].layout.large_screens.display_style == 'list'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += "#upsell_prev_rcent{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
                
              }

              if(payload.widgets[i].layout.large_screens.display_style == "line"){
                  
                  if(payload.widgets[i].layout.large_screens.display_as_carousel == true){
                      var removelm = document.querySelector(".crousl .upsell_prvbtn");
                      if(removelm){        
                          removelm.remove();
                      }
                      document.querySelector('#upsell_prev_rcent').classList.add('crousl');
                      var list = document.querySelector('#upsell_prev_rcent');
                      list.parentNode.insertAdjacentHTML('beforeend','<div class="upsell_prvbtn"><button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button></div>');
                      list.parentNode.classList.add("crousl")
                    }else{
                    upselstyle += "div#upsell_prev_rcent{overflow-x: scroll;}";
                  }
                  var custcss = payload.widgets[i].style;
                  upselstyle += custcss;
              } 
      } 
      if(wtype == "buy_it_again"){
         var recmDation1 = document.getElementById("upsell_prev_buyit");
          document.querySelector('.upsell_prev_buyit.title').innerHTML = payload.widgets[i].name;
          var allpro = payload.allpro.products;
          recmDation1.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          allpro.map(
          (item) =>
              ( 
                recmDation1.innerHTML += `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
              ${item.images.length ? `<img src="${item.images[0].src}" alt="" width="auto" height="auto" loading="lazy" />` : noimg}
                  
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>${item.title}</strong>
                  </div>
                  <div class="upsell__cart-price">$${item.variants[0].price}</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="addItem(this)">Add</button>
                  </div>
              </div>
              </div>`));

              if(payload.widgets[i].layout.large_screens.display_style == 'grid'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += " @media only screen and (min-width:768px){ #upsell_prev_buyit{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+payload.widgets[i].layout.large_screens.grid_columns+",1fr);}}";
                  upselstyle += custcss;
              } 
              if(payload.widgets[i].layout.large_screens.display_style == 'list'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += "#upsell_prev_buyit{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
                
              }

              if(payload.widgets[i].layout.large_screens.display_style == "line"){
                  
                  if(payload.widgets[i].layout.large_screens.display_as_carousel == true){
                      var removelm = document.querySelector(".crousl .upsell_prvbtn");
                      if(removelm){        
                          removelm.remove();
                      }
                      document.querySelector('#upsell_prev_buyit').classList.add('crousl');
                      var list = document.querySelector('#upsell_prev_buyit');
                      list.parentNode.insertAdjacentHTML('beforeend','<div class="upsell_prvbtn"><button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button></div>');
                      list.parentNode.classList.add("crousl")
                    }else{
                    upselstyle += "div#upsell_prev_buyit{overflow-x: scroll;}";
                  }
                  var custcss = payload.widgets[i].style;
                  upselstyle += custcss;
              }
      } 
      if(wtype == "top_sellers"){
         var recmDation1 = document.getElementById("upsell_prev_topsel");
          document.querySelector('.upsell_prev_topsel.title').innerHTML = payload.widgets[i].name;
          var allpro = payload.allpro.products;
          recmDation1.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          allpro.map(
          (item) =>
              ( 
                recmDation1.innerHTML += `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
              ${item.images.length ? `<img src="${item.images[0].src}" alt="" width="auto" height="auto" loading="lazy" />` : noimg}
                  
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>${item.title}</strong>
                  </div>
                  <div class="upsell__cart-price">$${item.variants[0].price}</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="addItem(this)">Add</button>
                  </div>
              </div>
              </div>`));

              if(payload.widgets[i].layout.large_screens.display_style == 'grid'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += " @media only screen and (min-width:768px){ #upsell_prev_topsel{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+payload.widgets[i].layout.large_screens.grid_columns+",1fr);}}";
                  upselstyle += custcss;
              } 
              if(payload.widgets[i].layout.large_screens.display_style == 'list'){
                  var custcss = payload.widgets[i].style;
                  upselstyle += "#upsell_prev_topsel{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
                
              }

              if(payload.widgets[i].layout.large_screens.display_style == "line"){
                  
                  if(payload.widgets[i].layout.large_screens.display_as_carousel == true){
                     var removelm = document.querySelector(".crousl .upsell_prvbtn");
                      if(removelm){        
                          removelm.remove();
                      }
                      document.querySelector('#upsell_prev_topsel').classList.add('crousl');
                      var list = document.querySelector('#upsell_prev_topsel');
                      list.parentNode.insertAdjacentHTML('beforeend','<div class="upsell_prvbtn"><button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button></div>');
                      list.parentNode.classList.add("crousl")
                    }else{
                    upselstyle += "div#upsell_prev_topsel{overflow-x: scroll;}";
                  }
                  var custcss = payload.widgets[i].style;
                  upselstyle += custcss;
              }
      } 

  }
}
  var wstyle = `<style>
  `+upselstyle+`

  </style>`;
  document.querySelector("body").insertAdjacentHTML('afterbegin',wstyle);
});
}
allwdgt();

function  discountLabel(){
if(event.data){
if(event.data.discount_input_status == true){
  if(event.data.discount_input.position == 'above_subtotal'){
    document.querySelector(".upsell_disc_input").innerHTML = `<div class="disount_input">
    <label>`+event.data.discount_input.discount_label+`</label>
    <input type="text" id="upsell_discinp" placeholder="`+event.data.discount_input.discount_code_label+`">
    <input type="button" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+event.data.discount_input.discount_button_label+`">
    </div>`;
  }
  else if(event.data.discount_input.position == 'below_lineitm'){
    document.querySelector(".upsel_disc_inp1").innerHTML = `<div class="disount_input">
    <label>`+event.data.discount_input.discount_label+`</label>
    <input type="text" id="upsell_discinp" placeholder="`+event.data.discount_input.discount_code_label+`">
    <input type="button" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+event.data.discount_input.discount_button_label+`">
    </div>`;
  }

}
}
}
discountLabel();
function cartOptions(){
if(event.data){
if(event.data.cart_btn_status == true){
  document.getElementById("viewCartButton").style.display = "block";
  document.getElementById("viewCartButton").innerHTML = '<a href="/cart">'+event.data.cart_btn_settings.view_cart_label+'</a>';
}
if(event.data.shopping_btn_status == true){
  if(event.data.continue_shopping.Position == "fly_top"){
    document.querySelector(".upsell_header").style.justifyContent ="space-evenly";
    document.querySelector(".upsell_header").style.display = "flex";
    document.getElementById("upsell_conti_top").innerHTML = "<span>"+event.data.continue_shopping.shopping_btn+"</span>"
  }else if(event.data.continue_shopping.Position == "fly_bottom"){
    document.getElementById("upsell_continueshop").innerHTML = "<span>"+event.data.continue_shopping.shopping_btn+"</span>"
  }
  
}
if(event.data.checkout_btn_status == true){
  document.getElementById("chkoutbtn").style.display = "block";
  if(event.data.checkout_btn_settings.checkout_routing == 'custom'){
    document.getElementById("chkoutbtn").innerHTML = '<a href="'+event.data.checkout_btn_settings.custom_checkout_url+'">'+event.data.checkout_btn_settings.checkout_label+'</a>'
  }else{
    document.getElementById("chkoutbtn").innerHTML = '<a href="/checkout">'+event.data.checkout_btn_settings.checkout_label+'</a>'
  }
  
}

if(event.data.checkout_btn_status == false){
  document.getElementById("chkoutbtn").style.display = "none";
}
if(event.data.payment_installments_status == true){
  document.getElementById("afterpayBottom").innerHTML = '<p>or '+event.data.payment_installments_settings.payment_count+' interest-free installments by <a href="'+event.data.payment_installments_settings.terms_url+'">'+event.data.payment_installments_settings.provider+'</a></p>'
}
if(event.data.note_status == true){
  if(event.data.note_input.position == "above_subtotal"){
    document.querySelector(".upsell_note_input2").innerHTML = `<div class="upsell_notediv"><label>`+event.data.note_input.note_label+`</label><textarea id='rebuy-cart-notes' placeholder='Your notes...' class='rebuy-textarea rebuy-cart__flyout-note-textarea'></textarea>`;
    document.querySelector(".upsell_notediv").style.paddingTop = event.data.note_input.padding+'px';
    document.querySelector(".upsell_notediv").style.paddingBottom  = event.data.note_input.padding+'px';
  }
  else if(event.data.note_input.position == "below_lineitm"){
    document.querySelector(".upsell_note_input1").innerHTML = `<div class="upsell_notediv"><label>`+event.data.note_input.note_label+`</label><textarea id='rebuy-cart-notes' placeholder='Your notes...' class='rebuy-textarea rebuy-cart__flyout-note-textarea'></textarea>`;
    document.querySelector(".upsell_notediv").style.paddingTop = event.data.note_input.padding+'px';
    document.querySelector(".upsell_notediv").style.paddingBottom  = event.data.note_input.padding+'px';
  }
  
}
document.getElementById("upsell_prev_titl").innerHTML = event.data.language.cart_title;
}
}

cartOptions();



function tiers(subtotalPrice){
if(event.data){
var subp = document.querySelector('#subtotalPrice').querySelector('.discount').innerText;
var subtotalPrice = parseFloat(subp.replace('$',''));

  document.getElementById("upsell_proglayout_two").innerHTML = '';
  document.getElementById('upsell_prev_gift').innerHTML = '';
  if(event.data.tiered_progress_bar == true){
  for(var k=0;k<event.data.tiered_progress_bar_tabs.length;k++){
  if(window.country == event.data.tiered_progress_bar_tabs[k].country){
    if( event.data.tiered_progress_bar_tabs[k].layout_type == "in_line"){
        var progress = document.getElementById('upsell_prev_gift');
        progress.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gifts"></div><div class="upsell__cart-progress-bar"> <div class="upsell__cart-bar" id="progressBar" style="width: 0%"></div></div>`);

    }else{
        var progress = document.getElementById("upsell_proglayout_two");
        progress.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gifts"></div><div class="upsell__cart-progress-bar"> <div class="upsell__cart-bar" id="progressBar" style="width: 0%"></div></div>`);
    }
    const hintContainer = document.getElementById("progressHint");
    const barContainer = document.querySelector("#upsell_prev_prog").querySelector('#progressBar');
    const btnclr = "background:hsl("+event.data.buy_more.button_color.hue+",70%,30%)";
    hintContainer.innerHTML = event.data.tiered_progress_bar_tabs[k].content;
    const layout = event.data.tiered_progress_bar_tabs[k].layout_type;
    const alltiers = event.data.tiered_progress_bar_tabs[k].tier.length;
    const gifts = document.querySelector(".upsell__cart-gifts");

    var amt = [];
    for(var i=0;i<alltiers;i++){
        const free = event.data.tiered_progress_bar_tabs[k].tier[i].type;
        const ship = event.data.tiered_progress_bar_tabs[k].tier[i].free_shipping_all_products;
        const minprice = parseFloat(event.data.tiered_progress_bar_tabs[k].tier[i].min_price);
        amt.push(minprice);
        if(free =='free_shipping'){
            var svg = `<svg width="11" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.82415 6.15237L0.726419 4.05464L0.012085 4.76395L2.82415 7.57601L8.86078 1.53938L8.15147 0.830078L2.82415 6.15237Z" fill="#8494A0"></path></svg>`;
            var title = "Free Shipping";
        }else{
            var svg = `<svg width="14" height="12" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7808 3.71012H10.9961C10.9961 1.73797 9.39873 0.140625 7.42658 0.140625C5.45444 0.140625 3.85709 1.73797 3.85709 3.71012H2.07234C1.09073 3.71012 0.287598 4.51325 0.287598 5.49486V16.2033C0.287598 17.185 1.09073 17.9881 2.07234 17.9881H12.7808C13.7624 17.9881 14.5656 17.185 14.5656 16.2033V5.49486C14.5656 4.51325 13.7624 3.71012 12.7808 3.71012ZM7.42658 1.92537C8.40819 1.92537 9.21133 2.72851 9.21133 3.71012H5.64184C5.64184 2.72851 6.44497 1.92537 7.42658 1.92537ZM12.7808 16.2033H2.07234V5.49486H3.85709V7.27961C3.85709 7.77042 4.25866 8.17198 4.74946 8.17198C5.24027 8.17198 5.64184 7.77042 5.64184 7.27961V5.49486H9.21133V7.27961C9.21133 7.77042 9.6129 8.17198 10.1037 8.17198C10.5945 8.17198 10.9961 7.77042 10.9961 7.27961V5.49486H12.7808V16.2033Z" fill="#8494A0"></path></svg>`;
            var title = "Mystery Gift";
        }
        gifts.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gift-item" id="`+minprice+`">
        <div class="upsell__cart-icon">`+svg+`</div><strong>`+title+`</strong></div>`);
        setTimeout(function(){
        const max = Math.max(...amt);
      
        if(subtotalPrice >= minprice){
          console.log('inner--'+subtotalPrice)
          document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
        }
        var pertcnt = subtotalPrice/max*100;
        barContainer.style = `width: `+pertcnt+`%;`;
        if(free == "free_shipping" && subtotalPrice >= minprice ){      
            document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
        }
       if(free == "free_shipping" && subtotalPrice < minprice){
            var pertcnt = 0;
            barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
        }
       if(free == "product" && subtotalPrice >= minprice){
              document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
              var pertcnt = minprice/max*100;
              barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
        }
      },200);
    }
  }
  }
}
  }
}

function announcMent(){
if(event.data){
var allitms = event.data.announcement_bar_items.length;
var remitm = document.querySelector("#upsell_mslide");
if(remitm){
  remitm.remove();
}
if(event.data.announcement_position == 'topflyout'){
  document.querySelector(".upsell_announctop").classList.remove('deactivated');
  var p = document.querySelector(".upsell_announctop");
 
}else{
  document.querySelector(".upsell_announctop").classList.add('deactivated');
  var p = document.getElementById("upsell_announcement");
}
p.innerHTML = '';
if(allitms <= 1){
   p.innerText = event.data.announcement_bar_items[0];
}else{
  var anoustemp = "<div id='upsell_mslide'></div>";
  p.innerHTML = anoustemp
  for(var i=0;i<allitms;i++){
    document.getElementById("upsell_mslide").innerHTML += ('<div class="slide">'+event.data.announcement_bar_items[i]+'</div>');
  }
}
}
}
announcMent();
tiers();

function announSlide(){
  const slideContainer = document.querySelector('#upsell_announcement');
  const slide = document.querySelector('#upsell_mslide');
  const interval = 2000;

  let slides = document.querySelectorAll('#upsell_mslide .slide');
  let index = 1;
  let slideId;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';

  slide.append(firstClone);
  slide.prepend(lastClone);

  const slideWidth = slides[index].clientWidth;

  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  const startSlide = () => {
  slideId = setInterval(() => {
      moveToNextSlide();
  }, interval);
  };

  const getSlides = () => document.querySelectorAll('.slide');

  slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
      slide.style.transition = 'none';
      index = 1;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
      slide.style.transition = 'none';
      index = slides.length - 2;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  });

  const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = '.55s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = '.5s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
  });

  startSlide();
}
announSlide();
document.getElementById("upsell_prev_styl").innerHTML= `<style>
.icon.active{
  background:hsl(`+event.data.buy_more.button_color.hue+`,70%,30%);
}
.progress-bar .bar{
  background:hsl(`+event.data.buy_more.button_color.hue+`,70%,30%);
}
button.btn-primary{
  background:hsl(`+event.data.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
}
button.btn-secondary{
  border: 2px solid hsl(`+event.data.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
  color: hsl(`+event.data.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
}
.addrecomd{
  background:hsl(`+event.data.buy_more.button_color.hue+`,70%,30%);
}
.cart-item button{
  background:hsl(`+event.data.buy_more.button_color.hue+`,70%,30%);
}
.upsell__cart-icon.active{
  background:hsl(`+event.data.buy_more.button_color.hue+`,70%,30%);
}
button#viewCartButton a{
  color: hsl(`+event.data.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
  text-decoration: none;
}
.upsell_announctop.deactivated{
  display:none;
}
div#upsell_continueshop span{
  background: hsl(`+event.data.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
  color: #fff;
  text-align: center;
  padding: 7px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>`;
}
window.addEventListener('message', function(event) {
  preview(event);
 
});
 
document.addEventListener("DOMContentLoaded", () => {
  preview();
  
});

