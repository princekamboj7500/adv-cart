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
          <div class="cart-item cart-item_back">
            <div class="image">
              <img src="${item.imageSrc}" alt="" />
            </div>
            <div class="title-qty">
              <div>
                <strong class="strong">${item.title}</strong>
                ${item.variant_title ? `<span class="varient_tittle_backend">${item.variant_title}</span>` : ""}
                  <span class="upsell__cart-price_1 instant_discount" id="${item.id}instant_discount"><span>
              </div>
              ${item.color ? `<div class="color color_varient">${item.color}</div>` : ""}
              ${
                item.discount === true
                  ? `<div class="discount instant_discount">Instant discount!</div>`
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
                  ? `<div class="discount discount_1">$${roundPrice(
                      item.qty * item.price
                    )}</div>`
                  : ""
              }
              <div class="price discount_1">
                ${
                  item.discount === true
                    ? `<s class="price_1">$${roundPrice(item.qty * item.oldPrice)}</s>`
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
  const hintContainer = document.getElementById("progressHint");
  var amt = [];
  for(var i = 0; i < ranges.length; i++){
      amt.push(ranges[i].getAttribute('id')); 
      var id = ranges[i].getAttribute('id');
      if(subtotalPrice >= id){
        document.getElementById(""+id+"").querySelector(".upsell__cart-icon").classList.add("active");
        document.getElementById(""+id+"").classList.remove("getprice");
      }else{
        document.getElementById(""+id+"").querySelector(".upsell__cart-icon").classList.remove("active");
        document.getElementById(""+id+"").classList.add("getprice");
      }
  }
  const max = Math.max(...amt);
  // setTimeout(function(){
  //   var prc = document.querySelectorAll('.upsell__cart-gift-item.getprice')[0]
  //   if(prc){
  //     var price = prc.getAttribute('id');
  //     hintContainer.innerHTML = "You are "+(price -subtotalPrice).toFixed(2)+" away from free gift"
  //   }
   
  // },500)
  console.log('subttoottaall', subtotalPrice)
  var pertcnt = subtotalPrice/max*100;
  barContainer2.style = `width: `+pertcnt+`%;`;
  // countTiers(subtotalPrice, tiers);
  
  
}

function hsbaToRgb(h, s, br, a) {
  // Convert HSB to RGB
  let c = (1 - Math.abs(2 * br - 1)) * s;
  let hp = h / 60.0;
  let x = c * (1 - Math.abs((hp % 2) - 1));
  let m = br - c / 2;
  let r = 0, g = 0, b = 0;
  if (hp >= 0 && hp < 1) {
    r = c;
    g = x;
  } else if (hp >= 1 && hp < 2) {
    r = x;
    g = c;
  } else if (hp >= 2 && hp < 3) {
    g = c;
    b = x;
  } else if (hp >= 3 && hp < 4) {
    g = x;
    b = c;
  } else if (hp >= 4 && hp < 5) {
    r = x;
    b = c;
  } else if (hp >= 5 && hp < 6) {
    r = c;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  // Convert alpha to decimal
  a = parseFloat(a);
  // Return RGB color code
  return "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
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
console.log('itemssss', items)
  subtotalItems = items.reduce((acc, item) => acc + item.qty, 0);
  subtotalPrice = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  // tem.qty * (item.oldPrice-item.price)
  var ct=0
  var ppp = items.map(function(item) {
    if (item.oldPrice > 0) {
      ct=ct+item.oldPrice-item.price
      console.log( 'ctt',ct)
    }
   
  });

  compare_item_price= subtotalPrice+ct;
  console.log('compare_item_price', subtotalPrice , compare_item_price)

  itemsContainer.innerHTML = `Subtotal (${subtotalItems} item${
    subtotalItems === 1 ? "" : "s"
  })`;
  priceContainer.innerHTML = `<span class="discount">$${roundPrice(
    subtotalPrice
  )}</span><s>${roundPrice(compare_item_price)}</s>`;
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
console.log(event.data);
if(event.data.general_settings_status == true){
  document.querySelector('html head').insertAdjacentHTML(`beforeend`,`<link rel="stylesheet" id="fontapend" href="https://fonts.googleapis.com/css?family=`+event.data.general_settings.font_family+`">`)
  document.querySelector('.cart').style.fontFamily = event.data.general_settings.font_family;
  document.querySelector('.cart').style.borderRadius  = event.data.general_settings.border_radius+'px';
  document.querySelector('.header').style.padding = event.data.general_settings.header_padding+'px';
  document.querySelector('.footer').style.padding = event.data.general_settings.footer_padding+'px';
}
if(event.data.clear_cart_status == true){
  document.querySelector('.message').innerHTML = '';
  document.querySelector('.message').insertAdjacentHTML(`afterbegin`,``+event.data.clear_cart.label+` <a href="#">`+event.data.clear_cart.btn_text+`</a>`)
}
if(event.data.clear_cart_status == false){
  document.querySelector('.message').style.display = "none";
}


function allwdgt(){
console.log(event.data.store)
fetch('https://cart.brandlift.io/api/prevwidget/'+event.data.store+'')
.then(function (response) {
    return response.json();
})
.then(function (payload) {
  var upselstyle = '';
  if(payload.widgets){
  for(var i=0;i<payload.widgets.length;i++){
      var wtype = payload.widgets[i].type;
      if(wtype == 'recommended_full_page)'){

         var recmDation = document.getElementById("upsell_prev_recom");
          if(document.querySelector('.crsl button')){
            document.querySelector('.crsl button').remove()
          }
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
  if(event.data.discount_input.layout == 'rounded'){
    var styl = 'border-radius: 20px'
  }else{
    var styl = ''
  }
  if(event.data.discount_input.position == 'above_subtotal'){
    document.querySelector(".upsell_disc_input").innerHTML = `<div class="disount_input">
    <input type="text" id="upsell_discinp" style="`+styl+`" placeholder="`+event.data.discount_input.discount_code_label+`">
    <input type="button" style="`+styl+`" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+event.data.discount_input.discount_button_label+`">
    </div>`;
  }
  else if(event.data.discount_input.position == 'below_lineitm'){
    document.querySelector(".upsel_disc_inp1").innerHTML = `<div class="disount_input">
    <input type="text" id="upsell_discinp" style="`+styl+`" placeholder="`+event.data.discount_input.discount_code_label+`">
    <input type="button" style="`+styl+`" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+event.data.discount_input.discount_button_label+`">
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

if(event.data.trust_badge.src != ""){
  document.querySelector('.cart__trusted-payment') && document.querySelector('.cart__trusted-payment').remove()
  const trustElement = document.createElement('div');
  // trustElement.style=`padding:${event.data.trust_badge.padding};margin:${event.data.trust_badge.margin};`;
  trustElement.className='cart__trusted-payment';
  trustElement.innerHTML = `<img src="/api/uploads/${event.data.trust_badge.src}" style="width:${event.data.trust_badge.width}%;" />`;
  document.getElementById("afterpayBottom").insertAdjacentElement('afterend', trustElement);
}

if(event.data.benefit.benefits.length){
  document.querySelector('.cart-benefits') && document.querySelector('.cart-benefits').remove();
  const benefitsElement = document.createElement('div');
  benefitsElement.style=`background-color:${event.data.benefit.background_color};padding:${event.data.benefit.section_padding};${event.data.benefit.layout == 'inline' ? 'grid-template-columns: 1fr 1fr;' : 'grid-template-columns: 1fr 1fr 1fr 1fr;'}`;
  benefitsElement.className='cart-benefits';
  benefitsElement.innerHTML = event.data.benefit.benefits.map(function(benefit){
    return `<div class="cart-benefits_item">
      <img src="/api/uploads/${benefit.image}" style="width:${benefit.size}px;padding:${benefit.image_padding};margin:${benefit.image_margin};" />
      <div style="font-size: ${benefit.font_size}px;font-weight: ${benefit.font_weight};color:${benefit.font_color};">${benefit.text}</div>
    </div>`;
  }).join('');
  document.querySelector(".content").appendChild(benefitsElement);
}

if(event.data.testimonial.testimonials.length){
  document.querySelector('.cart-testimonials') && document.querySelector('.cart-testimonials').remove();
  const testimonialsElement = document.createElement('div');
  // /${testimonial.image} <img src="/api/uploads/${testimonial.image}" style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};" />
  testimonialsElement.style=`background-color:${event.data.testimonial.background_color};padding:${event.data.testimonial.section_padding};`;
  testimonialsElement.className='cart-testimonials';
  
  testimonialsElement.innerHTML = event.data.testimonial.testimonials.map(function(testimonial){
    return `<div class="cart-testimonials_item">
      <div class="cart-testimonials_item_inner">
      ${ testimonial.image? `<img src="/api/uploads/${testimonial.image}" style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};" />` : `<span style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};"></span>`  }

        <div class="cart-testimonials_content">
          <p>${testimonial.review}</p>
          <b class="cart-testimonials_name">${testimonial.name}</b>
          <div class="cart-testimonials_date"><img src="https://conversionwise.com/wp-content/uploads/2022/11/right.png" /> Verified Purchase ${testimonial.order_date}</div>
          ${ testimonial.star? `<img src="https://ucarecdn.com/865b5d7a-31d3-4e8c-9e24-129571a604c0/-/format/auto/-/preview/120x120/-/quality/lightest/" />` : '' }
        </div>
      </div>
    </div>`;
  }).join('');
  if(event.data.testimonial.position == "top"){
    document.querySelector(".content").prepend(testimonialsElement);
  }else{
    document.querySelector(".content").appendChild(testimonialsElement);
  }
  
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
var subp = document.querySelector('#subtotalPrice').querySelector('.discount').innerText;
var subtotalPrice = parseFloat(subp.replace('$',''));
console.log('subtotalPricesubtotalPrice', subtotalPrice)
  document.getElementById("upsell_proglayout_two").innerHTML = '';
  document.querySelector('#upsell_prev_gift').innerHTML = '';
  if(event.data.tiered_progress_bar == true){
  for(var k=0;k<event.data.tiered_progress_bar_tabs.length;k++){
  if(window.country == event.data.tiered_progress_bar_tabs[k].country){
   
    var elem = document.getElementById( 'content_ht' );
            elem.classList.remove('otherclass2'); 
    if( event.data.tiered_progress_bar_tabs[k].layout_type == "in_line"){
        var progress = document.querySelector('#upsell_prev_gift');
        progress.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gifts"></div>`);

    }else{
        var progress = document.getElementById("upsell_proglayout_two");
        progress.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gifts"></div>`);
    }
    const hintContainer = document.getElementById("progressHint");
    const barContainer = document.querySelector("#upsell_prev_prog").querySelector('#progressBar');
    const btnclr = "background:hsl("+event.data.progress_bar_color.hue+",70%,30%)";
    const layout = event.data.tiered_progress_bar_tabs[k].layout_type;
    const alltiers = event.data.tiered_progress_bar_tabs[k].tier.length;
    const gifts = document.querySelector(".upsell__cart-gifts");



    var amt = [];
    for(var i=0;i<alltiers;i++){
        const free = event.data.tiered_progress_bar_tabs[k].tier[i].type;
        const ship = event.data.tiered_progress_bar_tabs[k].tier[i].free_shipping_all_products;
        const minprice = event.data.tiered_progress_bar_tabs[k].tier[i].min_price;
        const label_gift = event.data.tiered_progress_bar_tabs[k].tier[i].label;
        console.log('free2' ,free,minprice, subtotalPrice)
        amt.push(minprice)
        const max = Math.max(...amt);
        if(free =='free_shipping'){
            var svg = `<svg width="11" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.82415 6.15237L0.726419 4.05464L0.012085 4.76395L2.82415 7.57601L8.86078 1.53938L8.15147 0.830078L2.82415 6.15237Z" fill="#8494A0"></path></svg>`;
            var title = label_gift;
        } else if (minprice == 1000){
          var svg = `<svg width="14" height="12" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7808 3.71012H10.9961C10.9961 1.73797 9.39873 0.140625 7.42658 0.140625C5.45444 0.140625 3.85709 1.73797 3.85709 3.71012H2.07234C1.09073 3.71012 0.287598 4.51325 0.287598 5.49486V16.2033C0.287598 17.185 1.09073 17.9881 2.07234 17.9881H12.7808C13.7624 17.9881 14.5656 17.185 14.5656 16.2033V5.49486C14.5656 4.51325 13.7624 3.71012 12.7808 3.71012ZM7.42658 1.92537C8.40819 1.92537 9.21133 2.72851 9.21133 3.71012H5.64184C5.64184 2.72851 6.44497 1.92537 7.42658 1.92537ZM12.7808 16.2033H2.07234V5.49486H3.85709V7.27961C3.85709 7.77042 4.25866 8.17198 4.74946 8.17198C5.24027 8.17198 5.64184 7.77042 5.64184 7.27961V5.49486H9.21133V7.27961C9.21133 7.77042 9.6129 8.17198 10.1037 8.17198C10.5945 8.17198 10.9961 7.77042 10.9961 7.27961V5.49486H12.7808V16.2033Z" fill="#8494A0"></path></svg>`;
          var title = label_gift;
      }
      else{
        var svg = `<svg width="14" height="12" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7808 3.71012H10.9961C10.9961 1.73797 9.39873 0.140625 7.42658 0.140625C5.45444 0.140625 3.85709 1.73797 3.85709 3.71012H2.07234C1.09073 3.71012 0.287598 4.51325 0.287598 5.49486V16.2033C0.287598 17.185 1.09073 17.9881 2.07234 17.9881H12.7808C13.7624 17.9881 14.5656 17.185 14.5656 16.2033V5.49486C14.5656 4.51325 13.7624 3.71012 12.7808 3.71012ZM7.42658 1.92537C8.40819 1.92537 9.21133 2.72851 9.21133 3.71012H5.64184C5.64184 2.72851 6.44497 1.92537 7.42658 1.92537ZM12.7808 16.2033H2.07234V5.49486H3.85709V7.27961C3.85709 7.77042 4.25866 8.17198 4.74946 8.17198C5.24027 8.17198 5.64184 7.77042 5.64184 7.27961V5.49486H9.21133V7.27961C9.21133 7.77042 9.6129 8.17198 10.1037 8.17198C10.5945 8.17198 10.9961 7.77042 10.9961 7.27961V5.49486H12.7808V16.2033Z" fill="#8494A0"></path></svg>`;
        var title = label_gift;
      }
        gifts.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gift-item getprice" id="`+minprice+`">
        <div class="upsell__cart-icon">`+svg+`</div><strong>`+title+`</strong></div>`);
        
        
        
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
      }
    for( t=0 ; t< alltiers ; t++){
      const free =event.data.tiered_progress_bar_tabs[k].tier[t].type;
      const minprice = event.data.tiered_progress_bar_tabs[k].tier[t].min_price;
      const label_1 = '<span id="label_font_weight">' +event.data.tiered_progress_bar_tabs[k].tier[t].label+'</span>';
      const label_font_weight =event.data.tiered_progress_bar_tabs[k].tier[t].label_font_weight;
      console.log("ttttt",free,minprice,label_1, subtotalPrice)
      if(minprice-subtotalPrice > 0){
           
        if(free == "free_shipping" && subtotalPrice < minprice){
            hintContainer.innerHTML = "You are 1"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >" + (label_1) + " </b>";
            console.log('aaaa')
           break;
        }
        else if(free == "product" && subtotalPrice < minprice){
          console.log('bbb')
          if(minprice == 1000){
            
            hintContainer.innerHTML = "You are $"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
            
          }
          else{
            hintContainer.innerHTML = "You are $"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
          }
          break;
        }
       
      }else{
        hintContainer.innerHTML = "You unlock all  <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
      }

      
    }
    console.log('aaaaaaa',event.data)
    // for(var m=0;m<alltiers;m++){
    //   const free =event.data.tiered_progress_bar_tabs[k].tier[m].type;
    //   const minprice =event.data.tiered_progress_bar_tabs[k].tier[m].min_price;
    //   const label_1 = '<span id="label_font_weight">' +event.data.tiered_progress_bar_tabs[k].tier[m].label+'</span>';
    //   const label_font_weight =event.data.tiered_progress_bar_tabs[k].tier[m].label_font_weight;
    //   // label_1.style.fontWeight =event.data.tiered_progress_bar_tabs[k].tier[m].label_font_weight;

    //   console.log('free',free , minprice ,label_1, subtotalPrice)
    //   if(minprice-subtotalPrice > 0){
     
    //     if(free == "free_shipping" && subtotalPrice < minprice){
    //         hintContainer.innerHTML = "You are "+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >" + (label_1) + " </b>";
            
    //         break;
    //     }
    //     else if(free == "product" && subtotalPrice < minprice){
    //       if(minprice == 1000){
    //         hintContainer.innerHTML = "You are $"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
    //       }
    //       else{
    //         hintContainer.innerHTML = "You are $"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
    //       }
    //         break;
    //     }
       
    //   }else{
    //     hintContainer.innerHTML = "You unlock all  <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
    //   }

    // }
      // if(minprice-subtotalPrice > 0){
       
      //   if(free == "free_shipping" && subtotalPrice < minprice){
      //       hintContainer.innerHTML = "You are "+(minprice - subtotalPrice )+" away from free shipping";
      //       break;
      //   }
      //   else if(free == "product" && subtotalPrice < minprice){
      //       hintContainer.innerHTML = "You are "+(minprice - subtotalPrice )+" away from free gift";
      //       break;
      //   }
       
      // }else{
      //   hintContainer.innerHTML = "You unlock all free gift";
      // }


  }
  else{
    var elem = document.getElementById( 'content_ht' );
            elem.classList.add('otherclass2'); 

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
if(event.data.announcement_bar == true){
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
if(event.data.announcement_bar == false){
   p.style.display = "none";
}
}
}
announcMent();
tiers();

function announSlide(){
  const slideContainer = document.querySelector('#upsell_announcement');
  const slide = document.querySelector('#upsell_mslide');
  const interval = (event.data.announcement_settings.speed);

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
console.log(hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha))
var discountcss = `
  background:`+hsbaToRgb( event.data.discount_input.label_color.hue, event.data.discount_input.label_color.saturation, event.data.discount_input.label_color.brightness, event.data.discount_input.label_color.alpha)+`;
  color:`+hsbaToRgb( event.data.discount_input.label_font_color.hue, event.data.discount_input.label_font_color.saturation, event.data.discount_input.label_font_color.brightness, event.data.discount_input.label_font_color.alpha)+`;
  font-size:`+event.data.discount_input.label_font_size+`px;
  font-weight:`+event.data.discount_input.label_font_weight+`;
  width: 70%;
  border: none;
  padding-left: 10px;
`;
var disbtn = `
  color:`+hsbaToRgb( event.data.discount_input.button_font_color.hue, event.data.discount_input.button_font_color.saturation, event.data.discount_input.button_font_color.brightness, event.data.discount_input.button_font_color.alpha)+`;
  background:`+hsbaToRgb( event.data.discount_input.button_color.hue, event.data.discount_input.button_color.saturation, event.data.discount_input.button_color.brightness, event.data.discount_input.button_color.alpha)+`;
  font-size:`+event.data.discount_input.button_font_size+`px;
  font-weight:`+event.data.discount_input.button_font_weight+`;
`;
document.getElementById("upsell_prev_styl").innerHTML= `<style>
.icon.active{
  background:`+hsbaToRgb( event.data.buy_more.button_color.hue, event.data.buy_more.button_color.saturation, event.data.buy_more.button_color.brightness, event.data.buy_more.button_color.alpha)+`;
}
#upsell_discinp{
  `+discountcss+`
}
.disount_input input.addrecomd{
  `+disbtn+`
}
#upsell_discinp::placeholder{
  color:`+hsbaToRgb( event.data.discount_input.label_font_color.hue, event.data.discount_input.label_font_color.saturation, event.data.discount_input.label_font_color.brightness, event.data.discount_input.label_font_color.alpha)+`;
}
.progress-bar .bar{
  background:`+hsbaToRgb( event.data.progress_bar_color.hue, event.data.progress_bar_color.saturation, event.data.progress_bar_color.brightness, event.data.progress_bar_color.alpha)+`;
}
button.btn-primary{
  background:`+hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha)+`;
}
button.btn-secondary{
  border: 2px solid `+hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha)+`;
  color:`+hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha)+`;
}
.addrecomd{
  background:`+hsbaToRgb( event.data.buy_more.button_color.hue, event.data.buy_more.button_color.saturation, event.data.buy_more.button_color.brightness, event.data.buy_more.button_color.alpha)+`;
}
.cart-item button{
  background:`+hsbaToRgb( event.data.buy_more.button_color.hue, event.data.buy_more.button_color.saturation, event.data.buy_more.button_color.brightness, event.data.buy_more.button_color.alpha)+`;
}
.upsell__cart-icon.active{
  background:`+hsbaToRgb( event.data.progress_bar_color.hue, event.data.progress_bar_color.saturation, event.data.progress_bar_color.brightness, event.data.progress_bar_color.alpha)+`;
}
button#viewCartButton a{
  color:`+hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha)+`;
  text-decoration: none;
}
.upsell_announctop.deactivated{
  display:none;
}
div#upsell_continueshop span{
  background:`+hsbaToRgb( event.data.checkout_btn_settings.checking_out_color.hue, event.data.checkout_btn_settings.checking_out_color.saturation, event.data.checkout_btn_settings.checking_out_color.brightness, event.data.checkout_btn_settings.checking_out_color.alpha)+`;
  color: #fff;
  text-align: center;
  padding: 7px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.cart-item {
  background: #fff;
}
.header{
  background:`+hsbaToRgb( event.data.general_settings.header_background.hue, event.data.general_settings.header_background.saturation, event.data.general_settings.header_background.brightness, event.data.general_settings.header_background.alpha)+`;
}
.footer{
  background:`+hsbaToRgb( event.data.general_settings.footer_background.hue, event.data.general_settings.footer_background.saturation, event.data.general_settings.footer_background.brightness, event.data.general_settings.footer_background.alpha)+`;
}
.content{
  background:`+hsbaToRgb(  event.data.general_settings.main_background.hue,  event.data.general_settings.main_background.saturation,  event.data.general_settings.main_background.brightness,  event.data.general_settings.main_background.alpha)+`;
}
.upsell{
  background:`+hsbaToRgb(  event.data.general_settings.main_background.hue,  event.data.general_settings.main_background.saturation,  event.data.general_settings.main_background.brightness,  event.data.general_settings.main_background.alpha)+`;
}
.upsell2{
  background:`+hsbaToRgb(  event.data.general_settings.main_background.hue,  event.data.general_settings.main_background.saturation,  event.data.general_settings.main_background.brightness,  event.data.general_settings.main_background.alpha)+`;
}
.subtotal .subtotal-items{color:${event.data.general_settings.subtotal_color};font-family:${event.data.general_settings.subtotal_font};}
div#subtotalPrice{font-family:${event.data.general_settings.price_font};}
.subtotal .discount{color:${event.data.general_settings.price_color};}
div#subtotalPrice s{color:${event.data.general_settings.compare_price_color};}
.cart__trusted-payment{width:100%; float:left; margin:${event.data.trust_badge.margin}; padding:${event.data.trust_badge.padding}; text-align:${event.data.trust_badge.position};}
.cart-testimonials_content p{color:${event.data.testimonial.review_font_color}; font-size:${event.data.testimonial.review_font_size} ; font-weight:${event.data.testimonial.review_font_weight} ; font-style:${event.data.testimonial.review_font_style} ;}
.cart-testimonials_content b{color:${event.data.testimonial.customer_font_color}; font-size:${event.data.testimonial.customer_font_size} ; font-weight:${event.data.testimonial.customer_font_weight} ; font-style:${event.data.testimonial.customer_font_style} ;}
.cart-testimonials_content .cart-testimonials_date{color:${event.data.testimonial.order_font_color}; font-size:${event.data.testimonial.order_font_size} ; font-weight:${event.data.testimonial.order_font_weight} ; font-style:${event.data.testimonial.order_font_style} ;}
.upsell_announctop{padding:${event.data.announcement_settings.padding}; margin:${event.data.announcement_settings.margin};}
.cart-item_back{background:${event.data.general_settings.cartitem.background_color};  }

.color_varient{font-size:${event.data.general_settings.cartitem.variant_size}; color:${event.data.general_settings.cartitem.variant_color};  font-weight: ${event.data.general_settings.cartitem.variant_weight};}
.discount_1{font-size:${event.data.general_settings.cartitem.price_size}; color:${event.data.general_settings.cartitem.price_color};  font-weight: ${event.data.general_settings.cartitem.price_weight};}
.price_1{font-size:${event.data.general_settings.cartitem.discount_size}; color:${event.data.general_settings.cartitem.discount_color};  font-weight: ${event.data.general_settings.cartitem.discount_weight};}
.instant_discount{font-size:${event.data.general_settings.cartitem.price_size}; color:${event.data.general_settings.cartitem.price_color};  font-weight: ${event.data.general_settings.cartitem.price_weight};}
strong.strong{color:${event.data.general_settings.cartitem.title_color}; font-size:${event.data.general_settings.cartitem.title_size}; font-weight: ${event.data.general_settings.cartitem.title_weight};}


</style>`;
}
window.addEventListener('message', function(event) {
  preview(event);
 
});
 
document.addEventListener("DOMContentLoaded", () => {
  preview();
  
});

