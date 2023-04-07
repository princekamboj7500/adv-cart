class upsellCart{
  constructor() {
    this.subtotalItems = 0;
    this.subtotalPrice = 0;
    this.cart = {};
    this.tiers = [100, 200, 300];
    
    // Show/Hide "View Cart" Button
    const showViewCartButton = false;
    !showViewCartButton &&
        document.getElementById("viewCartButton").classList.add("upsell__cart-hidden");

    // Show/Hide Afterpay option
    // const afterpayShow = true;
    // const afterpayPosition = "bottom"; // 'top' or 'bottom'
    // const afterpayText = `<img src="images/afterpay.svg" alt="" /> available for orders over $35`;
    // if (afterpayShow) {
    //   if (afterpayPosition === "bottom") {
    //     document.getElementById("afterpayBottom").innerHTML = afterpayText;
    //   }
    //   if (afterpayPosition === "top") {
    //     document.getElementById("afterpayTop").innerHTML = afterpayText;
    //   }
    // }

    // Upsell show/hide options
    const upsellList = true;
    const upsellCarousel = true;
    !upsellList && document.querySelector(".upsell").classList.add("upsell__cart-hidden");
    !upsellCarousel && document.querySelector(".upsell2").classList.add("upsell__cart-hidden");

    this.cartMainContainer = document.querySelector(".upsell--cart");
    this.cartContainer = document.getElementById("cartItems");
    this.recmDation = document.getElementById("upsell__cart-upsell2-container");
    //this.drawCartItems();
    this.getItems();
    this.announcMent();
    this.getRecmdpros();
    this.cartOptions();
    this.getCounty();
  }

  async getItems(){
    var self = this;
    var cartObj = await fetch("/cart.js");
    cartObj = await cartObj.json();
    this.cart = cartObj;
    this.items = cartObj.items;
    this.drawCartItems();
  }

  async getRecmdpros(){
    var upselstyle = '';
    for(var i=0;i<window.UpsellWidget.length;i++){
        var wtype = window.UpsellWidget[i].type;
        if(wtype == 'recommended_full_page)'){
            
            if(window.UpsellWidget[i].images.fixed_height == true){
              upselstyle += '.upsell__cart-image img{height:'+window.UpsellWidget[i].images.image_height+"px;}"
            }
            if(window.UpsellWidget[i].images.fixed_width == true){
              upselstyle += '.upsell__cart-upsell2-item{width:'+window.UpsellWidget[i].images.image_width+"px;}"
            }
            if(window.UpsellWidget[i].images.image_radius_unit == "Pixels"){
              upselstyle += '.upsell__cart-upsell2-item{border-radius:'+window.UpsellWidget[i].images.image_radius+"px;}";
              upselstyle += '.upsell__cart-image img{border-radius:'+window.UpsellWidget[i].images.image_radius+"px;}"
            }
            if(window.UpsellWidget[i].images.image_radius_unit == "Percentage"){
              upselstyle += '.upsell__cart-upsell2-item{border-radius:'+window.UpsellWidget[i].images.image_radius+"%;}";
              upselstyle += '.upsell__cart-image img{border-radius:'+window.UpsellWidget[i].images.image_radius+"%;}"
            }

            var self = this;
            var cartObj = await fetch("/collections/all/products.json?limit=5");
            cartObj = await cartObj.json();
            var allpro = cartObj.products;
            this.recmDation.innerHTML='';
            var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
            allpro.map(
            (item) =>
                ( 
                    this.recmDation.innerHTML += `<div class="item upsell__cart-upsell2-item">
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
                        <button class="addrecomd" onclick="window.__upsellCart.addItem(${item.variants[0].id})" vid="${item.variants[0].id}">Add</button>
                    </div>
                </div>
                </div>`));
                if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                    upselstyle += "@media only screen and (max-width:767px){.upsell__cart-upsell2-container{display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
                }
                if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
                    var custcss = window.UpsellWidget[i].style;
                    upselstyle += " @media only screen and (min-width:768px){ .upsell__cart-upsell2-container{display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
                    upselstyle += custcss;
                } 
                if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
                    var custcss = window.UpsellWidget[i].style;
                    upselstyle += ".upsell__cart-upsell2-container{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                    upselstyle += custcss;
                  
                }
                if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
                    
                    if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                        document.querySelector('.upsell__cart-upsell2-container').classList.add('crousl');
                        var list = document.querySelectorAll('.crausalbtn');
                        for (var i = 0; i < list.length; ++i) {
                            list[i].classList.add('crousl');
                        }
                      
                    }else{
                      upselstyle += "div#upsell__cart-upsell2-container{overflow-x: scroll;}";
                    }
                    var custcss = window.UpsellWidget[i].style;
                    upselstyle += custcss;
                }
             
        } 
         if(wtype == "featured_items"){

          if(window.UpsellWidget[i].images.fixed_height == true){
            upselstyle += '.upsell__cart-image img{height:'+window.UpsellWidget[i].images.image_height+"px;}"
          }
          if(window.UpsellWidget[i].images.fixed_width == true){
            upselstyle += '.upsell__cart-upsell2-item{width:'+window.UpsellWidget[i].images.image_width+"px;}"
          }
          if(window.UpsellWidget[i].images.image_radius_unit == "Pixels"){
            upselstyle += '.upsell__cart-upsell2-item{border-radius:'+window.UpsellWidget[i].images.image_radius+"px;}";
            upselstyle += '.upsell__cart-image img{border-radius:'+window.UpsellWidget[i].images.image_radius+"px;}"
          }
          if(window.UpsellWidget[i].images.image_radius_unit == "Percentage"){
            upselstyle += '.upsell__cart-upsell2-item{border-radius:'+window.UpsellWidget[i].images.image_radius+"%;}";
            upselstyle += '.upsell__cart-image img{border-radius:'+window.UpsellWidget[i].images.image_radius+"%;}"
          }
          
          document.getElementById("newwidget").insertAdjacentHTML('afterbegin',"<div class='upwidgets' id='featured_itm'><div id='fitms'></div></div>");
          var newidget = document.getElementById("fitms");
          var self = this;
          var cartObj = await fetch("/collections/new-collection/products.json?limit=5");
          cartObj = await cartObj.json();
          var allpro = cartObj.products;
          newidget.innerHTML='';
          var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
          
          allpro.map(
          (item) =>
              ( 
                newidget.insertAdjacentHTML('afterbegin', `<div class="item upsell__cart-upsell2-item">
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
                      <button class="addrecomd" onclick="window.__upsellCart.addItem(${item.variants[0].id})" vid="${item.variants[0].id}">Add</button>
                  </div>
              </div>
              </div>`)));

              if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
                 upselstyle += "@media only screen and (min-width:768px){div#fitms{display:grid;grid-template-columns:repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
              }
              if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                  upselstyle += "@media only screen and (max-width:767px){div#fitms{display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
              }
              if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
                var custcss = window.UpsellWidget[i].style;
                upselstyle += "div#fitms{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                upselstyle += custcss;
            }
            if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
                    
              if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                document.getElementById('fitms').classList.add('crousl');
                document.getElementById('featured_itm').insertAdjacentHTML('beforeend','<button class="crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button>');
              }else{
                upselstyle += "div#fitms{overflow-x: scroll;}";
              }
              var custcss = window.UpsellWidget[i].style;
              upselstyle += custcss;
          }
              document.getElementById("featured_itm").insertAdjacentHTML('afterbegin',`<div class="upsell__cart-title">`+window.UpsellWidget[i].name+`</div>`);
        }
        if(wtype == "recently_viewed"){
            var recpro =  JSON.parse(localStorage.getItem('recentjson'));
            document.getElementById("newwidget").insertAdjacentHTML('afterbegin',"<div class='upwidgets2' id='recent_view'><div id='recentvue'></div></div>");
            var newidget3 = document.getElementById("recentvue");
             
            newidget3.innerHTML='';
            var noimg = '<img src='+window.noimg+' alt="" width="auto" height="auto" loading="lazy" />';
            for(var j=0;j<recpro.length;j++){
              newidget3.insertAdjacentHTML('afterbegin', `<div class="item upsell__cart-upsell2-item">
              <div class="upsell__cart-image">
                <img src="`+recpro[j].image+`" alt="" width="auto" height="auto" loading="lazy" />
              </div>
              <div class="upsell__cart-title-qty">
                  <div>
                      <strong>`+recpro[j].title+`</strong>
                  </div>
                  <div class="upsell__cart-price">$`+recpro[j].price+`</div>
              </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="window.__upsellCart.addItem(`+recpro[j].varid+`)" vid="`+recpro[j].varid+`">Add</button>
                  </div>
              </div>
              </div>`);
            }
            if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
              upselstyle += "@media only screen and (min-width:768px){div#recentvue{display:grid;grid-template-columns:repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
            }
            if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                upselstyle += "@media only screen and (max-width:767px){div#recentvue{display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
            }
            if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
              var custcss = window.UpsellWidget[i].style;
              upselstyle += "div#recentvue{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
              upselstyle += custcss;
          }
          if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
           
            if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                document.getElementById('recentvue').classList.add('crousl');
                document.getElementById('recent_view').insertAdjacentHTML('beforeend','<button class="crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button>');
            }else{
              upselstyle += "div#recentvue{overflow-x: scroll;}";
            }
            var custcss = window.UpsellWidget[i].style;
            upselstyle += custcss;
        }
            document.getElementById("recent_view").insertAdjacentHTML('afterbegin','<div class="upsell__cart-title">'+window.UpsellWidget[i].name+'</div>')
        }

    }
    var wstyle = `<style>
    `+upselstyle+`
    </style>`;
    document.querySelector("body").insertAdjacentHTML('afterbegin',wstyle);
  }

  announcMent(){
    var allitms = window.UpsellCart.announcement_bar_items.length;
    let p = document.getElementById("upsell_announcement");
    p.innerHTML = '';
    if(allitms <= 1){
        document.getElementById("upsell_announcement").innerText = window.UpsellCart.announcement_bar_items[0];
    }else{
      let anoustemp = "<div id='upsell_mslide'></div>";
      p.innerHTML = anoustemp
      for(var i=0;i<allitms;i++){
        document.getElementById("upsell_mslide").innerHTML += ('<div class="slide">'+window.UpsellCart.announcement_bar_items[i]+'</div>');
      }
    }

    var cart_title = document.getElementsByClassName("upsell__cart-title")[0];
    cart_title.innerHTML = window.UpsellCart.language.cart_title;

    document.getElementById("chkoutbtn").style.background = "hsl("+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+",90%,50%)";
    
  }
  drawerOpen(){
    
    this.cartMainContainer.classList.remove("upsell__cart-close");
    
    var elem = document.getElementById("last-clone");
    var elem2 =document.getElementById("first-clone");
    if(elem){
        elem.parentNode.removeChild(elem);
        elem2.parentNode.removeChild(elem2);
    }
    this.getItems();
    
    setTimeout(function(){
        window.__upsellCart.announSlide();
    },1000)
  }
  cartOptions(){
    if(window.UpsellCart.cart_btn_status == true){
      document.getElementById("viewCartButton").style.display = "block";
      document.getElementById("viewCartButton").innerHTML = '<a href="/cart">'+window.UpsellCart.cart_btn_settings.view_cart_label+'</a>';
    }
    if(window.UpsellCart.shopping_btn_status == true){
      document.getElementById("continueshop").innerHTML = "<a href='/collections/all'>"+window.UpsellCart.shopping_btn+"</a>"
    }
    if(window.UpsellCart.checkout_btn_status == true){
      document.getElementById("chkoutbtn").style.display = "block";
      document.getElementById("chkoutbtn").innerHTML = '<a href="/checkout">'+window.UpsellCart.checkout_btn_settings.checkout_label+'</a>'
    }else if(window.UpsellCart.checkout_btn_status == false){
      document.getElementById("chkoutbtn").style.display = "none";
    }
    if(window.UpsellCart.payment_installments_status == true){
      document.getElementById("afterpayBottom").innerHTML = '<p>or '+window.UpsellCart.payment_installments_settings.payment_count+' interest-free installments by <a href="'+window.UpsellCart.payment_installments_settings.terms_url+'">'+window.UpsellCart.payment_installments_settings.provider+'</a></p>'
    }
    if(window.UpsellCart.note_status == true){
      document.getElementById("continueshop").insertAdjacentHTML(`afterbegin`,`<div class="notediv"><label>`+window.UpsellCart.note_label+`</label><textarea id='rebuy-cart-notes' placeholder='Your notes...' class='rebuy-textarea rebuy-cart__flyout-note-textarea'></textarea>`);
    }
  }

  discountLabel(){
      if(window.UpsellCart.discount_input_status == true){
        document.getElementById("cartItems").insertAdjacentHTML('beforeend',`<div class="disount_input">
        <label>`+window.UpsellCart.discount_input.discount_label+`</label>
        <input type="text" placeholder="`+window.UpsellCart.discount_input.discount_code_label+`">
        <input type="submit" class="addrecomd" value="`+window.UpsellCart.discount_input.discount_button_label+`">
        </div>`)
      }
  }
  drawerClose(){
    this.cartMainContainer.classList.add("upsell__cart-close");
  }
  
  drawCartItems(items) {
   
    this.cartContainer.innerHTML = "";
  
    if (this.items.length === 0) {
      this.cartContainer.innerHTML += `
        <div class="empty-cart">
            <div class="upsell__cart-title" id="empty-cart">Your Cart is empty!</div>
            <div class="upsell__cart-subtitle">Add your favorite items to your cart.</div>
            <button class="btn-primary" onclick="shopAll()">Shop Now</button>
        </div>
      `;
    } else {
      var self = this;
      this.items.map(
        (item) =>
        
          (this.cartContainer.innerHTML += `
            <div class="upsell__cart-cart-item">
              <div class="upsell__cart-image">
                <img src="${item.image}" alt="" />
              </div>
              <div class="upsell__cart-title-qty">
                <div>
                  <strong>${item.title}</strong>
                </div>
                ${item.color ? `<div class="color">${item.color}</div>` : ""}
                ${
                  item.discount === true
                    ? `<div class="upsell__cart-discount">Instant discount!</div>`
                    : ""
                }
                <div class="qty">
                  <input
                    type="number"
                    name=""
                    id=""
                    value="${item.quantity}"
                    onchange="window.__upsellCart.changeQty(this, ${item.id})"
                  />
                </div>
              </div>
              <div class="upsell__cart-clear-price">
                <div class="clear">
                  <button onclick="window.__upsellCart.removeItem(${item.id})"></button>
                </div>
                ${
                  item.discount === true
                    ? `<div class="upsell__cart-discount">$${self.roundPrice(
                        item.quantity * item.price/100
                      )}</div>`
                    : ""
                }
                <div class="upsell__cart-price">
                  ${
                    item.discount === true
                      ? `<s>$${ self.roundPrice(item.quantity * item.discounted_price/100) }</s>`
                      : `$${ self.roundPrice(item.quantity * item.price/100) }`
                  }
                </div>
              </div>
            </div>
        `)
      );
    }
    
    this.countSubtotal(items);
    //console.log(this.subtotalPrice);
    this.countTiers(this.subtotalPrice, this.tiers);
    this.discountLabel();
  }
  
  addItem(e) {
    var data = JSON.stringify({
      "id": ""+e+"",
      "quantity": "1"
    });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.open("POST", "/cart/add.js");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(data);
    this.drawCartItems(this.items);
  }
  
  changeQty(e, id) {
    const item = this.items.find((item) => item.id === id);
    item.quantity = parseInt(e.value);
    this.drawCartItems(this.items);
    var num = item.id;
    var text = num.toString();
    var data = {"id": text, "quantity": e.value};
    this.changeItms(data)
  }
  getCounty(){

    fetch('https://geolocation-db.com/json/')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
      window.country = payload.country_code;
    });
  }
  removeItem(id) {
    const filteredItems = this.items.filter((item) => item.id !== id);
    this.items = filteredItems;
    var num = id;
    var text = num.toString();
    var data = {"id":text,"quantity":"0"};
    this.changeItms(data);
    this.drawCartItems(this.items);
  }
  changeItms(data){
        var xhr = new XMLHttpRequest();
        var url = "/cart/change.js";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                 
            }
        };
        var newdata = JSON.stringify(data);
        xhr.send(newdata);

  }
  cleanCart(event) {
    event.preventDefault();
    this.items = [];
    
    var storeurl = "/cart/clear";
    const creq1 = new XMLHttpRequest();
    creq1.open("POST", storeurl);
    creq1.send();
    this.drawCartItems(this.items);
  }
  
  showOptions(el) {
    const cartItem = el.closest(".upsell__cart-item");
    const addBtn = cartItem.querySelector(".upsell__cart-add-btn");
    const optionsSelect = cartItem.querySelector(".upsell__cart-options-select");

    addBtn.classList.remove("upsell__cart-hidden");
    optionsSelect.classList.remove("upsell__cart-hidden");
    el.classList.add("upsell__cart-hidden");
  }
  
  countSubtotal(items) {
    const itemsContainer = document.getElementById("subtotalItems");
    const priceContainer = document.getElementById("subtotalPrice");
    const singleitm = window.UpsellCart.language.subtotal_text_one_item;
    const manyitms = window.UpsellCart.language.subtotal_text_many_item;

    const qty = this.subtotalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
    this.subtotalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price/100, 0);
    
    itemsContainer.innerHTML = `${
        this.subtotalItems === 1 ? singleitm.replace('{{ item_count }}',qty) : manyitms.replace('{{ item_count }}',qty)
    }`;
    priceContainer.innerHTML = `<span class="discount">$${ this.roundPrice(
        this.subtotalPrice
    )}</span> <s>${ this.roundPrice(this.subtotalPrice  * 1.2) }</s>`;
    document.querySelector(".discount").style.color = "hsl("+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+",90%,50%)";
  }
  
  countTiers(subtotalPrice, tiers) {
    const hintContainer = document.getElementById("progressHint");
    const barContainer = document.getElementById("progressBar");
    const btnclr = "background:hsl("+window.UpsellCart.buy_more.button_color.hue+",70%,30%)";
    if(window.UpsellCart.tiered_progress_bar == true){
       for(var k=0;k<window.UpsellCart.tiered_progress_bar_tabs.length;k++){
        if(window.country == window.UpsellCart.tiered_progress_bar_tabs[k].country){
          hintContainer.innerHTML = window.UpsellCart.tiered_progress_bar_tabs[k].content;
          const layout = window.UpsellCart.tiered_progress_bar_tabs[k].layout_type;
          const alltiers = window.UpsellCart.tiered_progress_bar_tabs[k].tier.length;
          const gifts = document.querySelector(".upsell__cart-gifts");
          //document.getElementById("freegifts").innerHTML = '';
          //document.getElementById("giftlayout").innerHTML = '';
         
          gifts.innerHTML = '';
          var amt = [];
          
          for(var i=0;i<alltiers;i++){
              const free = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].type;
              const ship = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].free_shipping_all_products;
              const minprice = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].min_price;
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
             
              if(free == "free_shipping" && subtotalPrice >= minprice){
                  document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
                  var pertcnt = minprice/max*100;
                  barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
              }
              else if(free == "free_shipping" && subtotalPrice < minprice){
                  var pertcnt = 0;
                  barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
              }
              else if(free == "product" && subtotalPrice >= minprice){
                    document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
                    var pertcnt = minprice/max*100;
                    barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
              }
            },200);
          }
        }
       }
        
     }
  // else{
  //     if (subtotalPrice < tiers[0]) {
  //       hintContainer.innerHTML = `You are $${this.roundPrice(
  //           tiers[0] - subtotalPrice
  //       )} away from <strong>FREE SHIPPING</strong>`;
  //       barContainer.style = `width: ${this.roundPrice(
  //           (subtotalPrice / tiers[2]) * 100
  //       )}%`;
  //       freeShippingIcon.querySelector(".upsell__cart-icon").classList.remove("active");
  //       gift1Icon.querySelector(".upsell__cart-icon").classList.remove("active");
  //       gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
  //     }
  //     if (subtotalPrice >= tiers[0]) {
  //       hintContainer.innerHTML = `Add $${this.roundPrice(
  //           tiers[1] - subtotalPrice
  //       )} to unlock a free Mystery Gift!`;
  //       barContainer.style = `width: ${this.roundPrice(
  //           (subtotalPrice / tiers[2]) * 100
  //       )}%`;
  //       freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
  //       gift1Icon.querySelector(".upsell__cart-icon").classList.remove("active");
  //       gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
  //     }
  //     if (subtotalPrice >= tiers[1]) {
  //       hintContainer.innerHTML = `Add $${this.roundPrice(
  //           tiers[2] - subtotalPrice
  //       )} to unlock a one more Mystery Gift!`;
  //       barContainer.style = `width: ${this.roundPrice(
  //           (subtotalPrice / tiers[2]) * 100
  //       )}%`;
  //       freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
  //       gift1Icon.querySelector(".upsell__cart-icon").classList.add("active");
  //       gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
  //     }
  //     if (subtotalPrice >= tiers[2]) {
  //       hintContainer.innerHTML = `You've unlocked a Free Mystery Gift!`;
  //       barContainer.style = `width: 100%`;
  //       freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
  //       gift1Icon.querySelector(".upsell__cart-icon").classList.add("active");
  //       gift2Icon.querySelector(".upsell__cart-icon").classList.add("active");
  //     }
  // }
  }

announSlide(){
    const slideContainer = document.querySelector('.upsell__cart-message');
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
  
  roundPrice(num) {
    return num.toFixed(2);
  }
  
}
document.addEventListener("DOMContentLoaded", () => {
  
  var href = window.location.href;
  var split = href.split("/products/");
  var result = split.includes("?");
  window.recent = [];
  if(result == true){
    window.recent.push(split[1].split('?')[0]);
  }else{
    window.recent.push(split[1]);
  }
 
  if(localStorage.getItem('recently_viewed') == null){
    localStorage.setItem('recently_viewed',window.recent);
    getRecentjson(window.recent);
  }else{
    var newarr = localStorage.getItem('recently_viewed').split(',');
    if(newarr.indexOf(""+split[1].split('?')[0]+"") > -1){
      
    }else{
      getRecentjson(split[1].split('?')[0]);
      newarr.push(split[1].split('?')[0]);
      localStorage.setItem('recently_viewed',newarr)
    }
  }

  function creqListener1() {
        var proprice = JSON.parse(this.responseText);
        var currentpro = (proprice.item_count);
        localStorage.setItem("cartqty",""+currentpro+"");
  }
  var storeurl = "/cart.js";
  const creq1 = new XMLHttpRequest();
  creq1.addEventListener("load", creqListener1);
  creq1.open("GET", storeurl);
  creq1.send();
});

function getRecentjson(handle){
  function reqListener() {
          var json = JSON.parse(this.responseText);
          var recent = json.product;

          var recentpro = localStorage.getItem('recentjson');
          if(recentpro == null || recentpro == ''){
            recentpro = [];
          }else{
           // emojis_arr.shift();
           recentpro = JSON.parse(recentpro);
          }
          
          if(recentpro.length >= 5){
              recentpro.shift();
              recentpro.push({
                title: recent.title,
                price: recent.variants[0].price,
                varid:recent.variants[0].id,
                image:recent.image.src
              })
              localStorage.recentjson = JSON.stringify(recentpro);
          }else{
              recentpro.push({
                title: recent.title,
                price: recent.variants[0].price,
                varid:recent.variants[0].id,
                image:recent.image.src
              })
              localStorage.recentjson = JSON.stringify(recentpro);
          }
          

        }
        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", "/products/"+handle+".json");
        req.send();
      
}

document.addEventListener("click", loadDoc);
function loadDoc(){
    setTimeout(function(){
        function creqListener() {
            var proprice = JSON.parse(this.responseText);
            var currentpro = (proprice.item_count);
            var prev = parseInt(localStorage.getItem("cartqty"));
            if(prev != currentpro){
                localStorage.setItem("cartqty",""+currentpro+"");
                window.__upsellCart.drawerOpen();
            }else{
               
            }
            
        }
        var storeurl = "/cart.js";
        const creq = new XMLHttpRequest();
        creq.addEventListener("load", creqListener);
        creq.open("GET", storeurl);
        creq.send();
    },1500)
      
}

function nextSlide(elem){
    var parnt = elem.parentNode.querySelector('.crousl');
  
    var neslide = parnt.firstChild.innerHTML;
    var nxt = `<div class='item upsell__cart-upsell2-item'>`+neslide+`</div>`;
    parnt.classList.add("animate");
    setTimeout(function(){
      parnt.classList.remove("animate");
      parnt.insertAdjacentHTML('beforeend',nxt);
      parnt.querySelector(".upsell__cart-upsell2-item").remove();
        
    },300);
   
}
function shopAll(){
  window.location.href = "/collections/all";
}

function prevSlide(elem){
    var parnt =  elem.parentNode.querySelector('.crousl');
    var prevslide = parnt.querySelectorAll(".upsell__cart-upsell2-item");
     var last = prevslide[prevslide.length- 1].innerHTML;
     var nxt = `<div class='item upsell__cart-upsell2-item'>`+last+`</div>`;
     parnt.classList.add("animaterev");
     setTimeout(function(){
        parnt.classList.remove("animaterev");
        parnt.insertAdjacentHTML('afterbegin',nxt);
        prevslide[prevslide.length- 1].remove();
    },300);
}

var drarbtn = document.querySelectorAll('[href="/cart"]').length;
const drawerdirecion = window.UpsellCart.product_form_redirect;
if(drawerdirecion == 'none' || drawerdirecion == 'disabled'){
  for(var i=0;i<drarbtn;i++){
    var eve = document.querySelectorAll('[href="/cart"]')[i];
    eve.onclick = function(event) {  
        event.preventDefault();
        window.__upsellCart.drawerOpen();
    };  
  }
}else if(drawerdirecion == 'checkout'){
  for(var i=0;i<drarbtn;i++){
    var eve = document.querySelectorAll('[href="/cart"]')[i];
    eve.onclick = function(event) {  
        event.preventDefault();
        window.location.href = "/checkout";
    };  
  }
}


var styles = 'background : hsl('+window.UpsellCart.buy_more.button_color.hue+',70%,30%)';
var viewclr = 'background : hsl('+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+',90%,50%)';
var customcode = '';
if(window.UpsellCart.custom_code_status == true){
  customcode = window.UpsellCart.custom_code;
}
var appstyle = `<style>
.upsell__cart-icon.active{
  `+styles+`
}
#viewcart a{
  `+viewclr+`
}
#continueshop a{
  `+viewclr+`
}
.addrecomd{
  background : hsl(`+window.UpsellCart.buy_more.button_color.hue+`,70%,30%);
}
.btn-primary{
  background : hsl(`+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
}
button#viewCartButton a{
  color:hsl(`+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
  text-decoration: none;
}
button.btn-primary{
  border: 2px solid hsl(`+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
}
button.btn-secondary{
  border: 2px solid hsl(`+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+`,90%,50%);
}
.upsell__cart-cart-item button{
  background : hsl(`+window.UpsellCart.buy_more.button_color.hue+`,70%,30%);
}
`+customcode+`
</style>`;
const abc = document.querySelector("body");
abc.insertAdjacentHTML('afterbegin',appstyle);
  
window.__upsellCart = new upsellCart();

/*
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
          <div class="upsell__cart-cart-item">
            <div class="upsell__cart-image">
              <img src="${item.imageSrc}" alt="" />
            </div>
            <div class="upsell__cart-title-qty">
              <div>
                <strong>${item.title}</strong>
              </div>
              ${item.color ? `<div class="color">${item.color}</div>` : ""}
              ${
                item.discount === true
                  ? `<div class="upsell__cart-discount">Instant discount!</div>`
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
            <div class="upsell__cart-clear-price">
              <div class="clear">
                <button onclick="removeItem(${item.id})"></button>
              </div>
              ${
                item.discount === true
                  ? `<div class="upsell__cart-discount">$${roundPrice(
                      item.qty * item.price
                    )}</div>`
                  : ""
              }
              <div class="upsell__cart-price">
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
  console.log(subtotalPrice);
  countTiers(subtotalPrice, tiers);
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

function countTiers(subtotalPrice, tiers) {
  const hintContainer = document.getElementById("progressHint");
  const barContainer = document.getElementById("progressBar");
  const freeShippingIcon = document.getElementById("freeShipping");
  const gift1Icon = document.getElementById("gift1");
  const gift2Icon = document.getElementById("gift2");

  if (subtotalPrice < tiers[0]) {
    hintContainer.innerHTML = `You are $${roundPrice(
      tiers[0] - subtotalPrice
    )} away from <strong>FREE SHIPPING</strong>`;
    barContainer.style = `width: ${roundPrice(
      (subtotalPrice / tiers[2]) * 100
    )}%`;
    freeShippingIcon.querySelector(".icon").classList.remove("active");
    gift1Icon.querySelector(".icon").classList.remove("active");
    gift2Icon.querySelector(".icon").classList.remove("active");
  }
  if (subtotalPrice >= tiers[0]) {
    hintContainer.innerHTML = `Add $${roundPrice(
      tiers[1] - subtotalPrice
    )} to unlock a free Mystery Gift!`;
    barContainer.style = `width: ${roundPrice(
      (subtotalPrice / tiers[2]) * 100
    )}%`;
    freeShippingIcon.querySelector(".icon").classList.add("active");
    gift1Icon.querySelector(".icon").classList.remove("active");
    gift2Icon.querySelector(".icon").classList.remove("active");
  }
  if (subtotalPrice >= tiers[1]) {
    hintContainer.innerHTML = `Add $${roundPrice(
      tiers[2] - subtotalPrice
    )} to unlock a one more Mystery Gift!`;
    barContainer.style = `width: ${roundPrice(
      (subtotalPrice / tiers[2]) * 100
    )}%`;
    freeShippingIcon.querySelector(".icon").classList.add("active");
    gift1Icon.querySelector(".icon").classList.add("active");
    gift2Icon.querySelector(".icon").classList.remove("active");
  }
  if (subtotalPrice >= tiers[2]) {
    hintContainer.innerHTML = `You've unlocked a Free Mystery Gift!`;
    barContainer.style = `width: 100%`;
    freeShippingIcon.querySelector(".icon").classList.add("active");
    gift1Icon.querySelector(".icon").classList.add("active");
    gift2Icon.querySelector(".icon").classList.add("active");
  }
}

function roundPrice(num) {
  return num.toFixed(2);
}
*/