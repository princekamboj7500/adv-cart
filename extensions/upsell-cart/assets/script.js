class upsellCart{
  constructor() {
    this.subtotalItems = 0;
    this.subtotalPrice = 0;
    this.cart = {};
    this.tiers = [100, 200, 300];

    //this.domain = "https://cart.brandlift.io/"   lINE 1205  ;
    
   


    // Show/Hide "View Cart" Button
    const showViewCartButton = false;
    !showViewCartButton &&
        document.getElementById("viewCartButton").classList.add("upsell__cart-hidden");

  
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
    this.clearCart();
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
            console.log(allpro);
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
                        <strong class="strong">${item.title}</strong>
                       
                    </div>
                    
                    <div class="upsell__cart-price">`+window.money+` ${item.variants[0].price}</div>
                </div>
                <div class="upsell_variants">
                 ${ item.variants[1] ? ` <select class="upsell_voptions" onchange="window.__upsellCart.upsellVoptn(this)">
                 ${
                   item.variants.map(
                     (variant) =>
                         ( 
                           `<option  value="${variant.id}">${variant.title}</option>`
                         ))
                 }
                 </select>`: ''}
                 
                </div>
                <div class="upsell__cart-clear-price">
                    <div class="upsell__cart-add-btn">
                        <button class="addrecomd" onclick="window.__upsellCart.addItem(${item.variants[0].id})" vid="${item.variants[0].id}">Add</button>
                    </div>
                </div>
                </div>`));
                if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                    upselstyle += "@media only screen and (max-width:767px){.upsell__cart-upsell2-container{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
                }
                if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
                    var custcss = window.UpsellWidget[i].style;
                    upselstyle += " @media only screen and (min-width:768px){ .upsell__cart-upsell2-container{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
                    upselstyle += custcss;
                } 
                if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
                    var custcss = window.UpsellWidget[i].style;
                    upselstyle += ".upsell__cart-upsell2-container{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                    upselstyle += custcss;
                  
                }
                if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
                    
                    if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                        document.querySelector('.upsell__cart-upsell2-container').style.overflow ="hidden";
                        document.querySelector('.upsell__cart-upsell2-container').classList.add('crousl');
                        var list = document.querySelectorAll('.upsell_crausalbtn');
                        for (var i = 0; i < list.length; ++i) {
                            list[i].classList.add('crousl');
                        }
                      
                    }else{
                      upselstyle += "div#upsell__cart-upsell2-container{overflow-x: scroll;}.upsell__cart-upsell2 button.upsell_crausalbtn{display:block;}";
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
          console.log(window.UpsellWidget[i].coll.col_name)
          var cartObj = await fetch("/collections/"+window.UpsellWidget[i].coll.col_name+"/products.json?limit=5");
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
                      <strong class="strong">${item.title}</strong>
                      
                  </div>
                  <div class="upsell__cart-price ">`+window.money+` ${item.variants[0].price}</div>
              </div>
              <div class="upsell_variants">
                 ${ item.variants[1] ? ` <select class="upsell_voptions" onchange="window.__upsellCart.upsellVoptn(this)">
                 ${
                   item.variants.map(
                     (variant) =>
                         ( 
                           `<option  value="${variant.id}">${variant.title}</option>`
                         ))
                 }
                 </select>`: ''}
                 
                </div>
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="window.__upsellCart.addItem(${item.variants[0].id})" vid="${item.variants[0].id}">Add</button>
                  </div>
              </div>
              </div>`)));

              if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
                 upselstyle += "@media only screen and (min-width:768px){overflow: hidden;gap:15px;div#fitms{display:grid;grid-template-columns:repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
              }
              if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                  upselstyle += "@media only screen and (max-width:767px){div#fitms{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
              }
              if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
                  var custcss = window.UpsellWidget[i].style;
                  upselstyle += "div#fitms{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
                  upselstyle += custcss;
              }
            if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
                    
              if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                document.getElementById('fitms').classList.add('crousl');
                document.getElementById('featured_itm').insertAdjacentHTML('beforeend','<button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button>');
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
                      <strong class="strong">`+recpro[j].title+`</strong>
                     
                  </div>
                  <div class="upsell__cart-price abagba">`+window.money+` `+recpro[j].price+`</div>
              </div>
              
              <div class="upsell__cart-clear-price">
                  <div class="upsell__cart-add-btn">
                      <button class="addrecomd" onclick="window.__upsellCart.addItem(`+recpro[j].varid+`)" vid="`+recpro[j].varid+`">Add</button>
                  </div>
              </div>
              </div>`);
            }
            
            if(window.UpsellWidget[i].layout.large_screens.display_style == 'grid'){
              upselstyle += "@media only screen and (min-width:768px){div#recentvue{overflow: hidden;gap:15px;display:grid;grid-template-columns:repeat("+window.UpsellWidget[i].layout.large_screens.grid_columns+",1fr);}}";
            }
            if(window.UpsellWidget[i].layout.small_screens.display_style == 'grid'){
                upselstyle += "@media only screen and (max-width:767px){div#recentvue{overflow: hidden;gap:15px;display:grid;grid-template-columns: repeat("+window.UpsellWidget[i].layout.small_screens.grid_columns+",1fr);}}"
            }
            if(window.UpsellWidget[i].layout.large_screens.display_style == 'list'){
              var custcss = window.UpsellWidget[i].style;
              upselstyle += "div#recentvue{display:grid;}.upsell__cart-upsell2-item{ width:100%;text-align: center;}.upsell__cart-upsell2-item img{width:unset;}";
              upselstyle += custcss;
          }
          
          if(window.UpsellWidget[i].layout.large_screens.display_style == "line"){
           
            if(window.UpsellWidget[i].layout.large_screens.display_as_carousel == true){
                document.getElementById('recentvue').classList.add('crousl');
                document.getElementById('recent_view').insertAdjacentHTML('beforeend','<button class="upsell_crausalbtn crousl" onclick="prevSlide(this)" id="prev"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path> </svg></button><button class="upsell_crausalbtn crousl" onclick="nextSlide(this)" id="next"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path> </svg></button>');
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
    if(window.UpsellCart.announcement_position == 'topflyout'){
      var p = document.querySelector(".upsell_announctop");
    }else{
      document.querySelector(".upsell_announctop").classList.add('deactivated');
      var p = document.getElementById("upsell_announcement");
    }
    
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

    document.getElementById("chkoutbtn").style.background = hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha);
    
  }

  emptyCart(){
    if(window.UpsellCart.cart_empty_status == true){
          var empdiv = document.querySelector(".empty-cart");
          if(empdiv){
           empdiv.insertAdjacentHTML(`afterend`,`<div class="empty_upsell_coll">
            </div>`);
            for(var i=0;i<window.UpsellCart.cart_empty.collections.length;i++){
              var str = window.UpsellCart.cart_empty.collections[i];
              str = str.replace(/\s+/g, '-').toLowerCase();
               document.querySelector(".empty_upsell_coll").insertAdjacentHTML(`afterbegin`,`<a href="/collections/`+str+`">`+window.UpsellCart.cart_empty.collections[i]+`</a>`);
            }
          }    
    }
  }

  clearCart(){
    const clearmsg = document.querySelector('.upsell__cart-message');

    if(window.UpsellCart.clear_cart_status == false){
      clearmsg.style.display = "none";
    }else{
      clearmsg.insertAdjacentHTML(`afterbegin`,``+window.UpsellCart.clear_cart.label+` <a href="#" onclick="window.__upsellCart.cleanCart(event)">`+window.UpsellCart.clear_cart.btn_text+`</a>`)
    }
  }

  drawerOpen(){
    
    this.cartMainContainer.classList.remove("upsell__cart-close");
    document.querySelector('body').classList.add('upsell_draw')
    
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
      if(window.UpsellCart.continue_shopping.Position == "fly_top"){
        document.querySelector(".upsell_header").style.justifyContent ="space-evenly";
        document.querySelector(".upsell_header").style.display = "flex";
        document.getElementById("upsell_conti_top").innerHTML = "<span onclick='window.__upsellCart.upsellConti();'>"+window.UpsellCart.continue_shopping.shopping_btn+"</span>"
      }else if(window.UpsellCart.continue_shopping.Position == "fly_bottom"){
        document.getElementById("upsell_continueshop").innerHTML = "<span onclick='window.__upsellCart.upsellConti();'>"+window.UpsellCart.continue_shopping.shopping_btn+"</span>"
        document.getElementById("upsell_continueshop").style.marginBottom = "40px";
      }
      
    }
    if(window.UpsellCart.checkout_btn_status == true){
      document.getElementById("chkoutbtn").style.display = "block";
      document.getElementById("chkoutbtn").innerHTML = '<a href="/checkout">'+window.UpsellCart.checkout_btn_settings.checkout_label+'</a>'
    }
    if(window.UpsellCart.checkout_btn_status == false){
      document.getElementById("chkoutbtn").style.display = "none";
    }
    if(window.UpsellCart.payment_installments_status == true){
      document.getElementById("afterpayBottom").innerHTML = '<p>or '+window.UpsellCart.payment_installments_settings.payment_count+' interest-free installments by <a href="'+window.UpsellCart.payment_installments_settings.terms_url+'">'+window.UpsellCart.payment_installments_settings.provider+'</a></p>'
    }
    if(window.UpsellCart.note_status == true){
      if(window.UpsellCart.note_input.position == "above_subtotal"){
        document.querySelector(".upsell_note_input2").innerHTML = `<div class="upsell_notediv"><label>`+window.UpsellCart.note_input.note_label+`</label><textarea id='rebuy-cart-notes' placeholder='Your notes...' class='rebuy-textarea rebuy-cart__flyout-note-textarea'></textarea>`;
        document.querySelector(".upsell_notediv").style.paddingTop = window.UpsellCart.note_input.padding+'px';
        document.querySelector(".upsell_notediv").style.paddingBottom  = window.UpsellCart.note_input.padding+'px';
      }
      else if(window.UpsellCart.note_input.position == "below_lineitm"){
        document.querySelector(".upsell_note_input1").innerHTML = `<div class="upsell_notediv"><label>`+window.UpsellCart.note_input.note_label+`</label><textarea id='rebuy-cart-notes' placeholder='Your notes...' class='rebuy-textarea rebuy-cart__flyout-note-textarea'></textarea>`;
        document.querySelector(".upsell_notediv").style.paddingTop = window.UpsellCart.note_input.padding+'px';
        document.querySelector(".upsell_notediv").style.paddingBottom  = window.UpsellCart.note_input.padding+'px';
      }
      
    }
  }

  discountLabel(){
    if(window.UpsellCart.discount_input.layout == 'rounded'){
      var styl = 'border-radius: 20px'
    }else{
      var styl = ''
    }
    if(window.UpsellCart.discount_input_status == true){
      document.querySelector(".upsell__cart-content").style.height = "calc(100% - 440px)";
      if(window.UpsellCart.discount_input.position == 'above_subtotal'){
        document.querySelector(".upsell_disc_input").innerHTML = `<div class="upsell_disount_input">
        <input type="text" id="upsell_discinp" style="`+styl+`" placeholder="`+window.UpsellCart.discount_input.discount_code_label+`">
        <input type="button"  style="`+styl+`" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+window.UpsellCart.discount_input.discount_button_label+`">
        
        </div><div id="upsell_error1"></div>`;
      }
      else if(window.UpsellCart.discount_input.position == 'below_lineitm'){
        document.querySelector(".upsel_disc_inp1").innerHTML = `<div class="upsell_disount_input">
        <input type="text" id="upsell_discinp"  style="`+styl+`" placeholder="`+window.UpsellCart.discount_input.discount_code_label+`">
        <input type="button" style="`+styl+`" onclick="window.__upsellCart.validateCode(this)" class="addrecomd" value="`+window.UpsellCart.discount_input.discount_button_label+`">
        
        </div><div id="upsell_error1">`;
      }
     
    }
}

validateCode(elem){
  var element = document.querySelector(".upsell_disount_input .addrecomd");
  element.value = "checking...";
  var dcode = document.getElementById("upsell_discinp").value;
  console.log(dcode);
  var url = '/apps/coupon/'+dcode+'/'+window.upsell_shop_domain;
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (payload) {
    
   if(payload.discount_code){
    document.querySelector("#upsell_error1").innerHTML = "Valid code";
     element.value = window.UpsellCart.discount_input.discount_button_label;
     document.querySelector("#chkoutbtn a").setAttribute("href","/checkout?discount="+dcode+"")
   }else{
     document.querySelector("#chkoutbtn a").setAttribute("href","/checkout")
     document.querySelector("#upsell_error1").innerHTML = window.UpsellCart.discount_input.discount_invalid_message;
     element.value = window.UpsellCart.discount_input.discount_button_label;
   }
  });
  
}
  drawerClose(){
    this.cartMainContainer.classList.add("upsell__cart-close");
    document.querySelector('body').classList.remove('upsell_draw')
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
      var lent= this.items;
      var comp_length=lent.length;
  for (let i = 0; i < comp_length; i++) {
        
       
       
        let comp_data=this.items[i].handle;
        let cmp_qnt=this.items[i].quantity;
        let comp_id=this.items[i].id;
        var comp_url='http://127.0.0.1:9292/products/'+ comp_data +'.json'
        fetch(comp_url)
        .then((response) => {
          
          if (!response.ok) {
            
            throw new Error('Network response was not ok');
          }
         
          return response.json();
        })
        
        .then((data) => {
          const compare_price_data = data.product.variants[0].compare_at_price * cmp_qnt;
          
          if (compare_price_data != 0){
            var inst_dis=comp_id+'instant_discount'
            // console.log('cmpcmp', cmp)
            document.getElementById(inst_dis).innerHTML = "Instant discount! ";
            document.getElementById(comp_id).innerHTML = '$'+ compare_price_data;
            document.getElementById('subtotal_dis_id').innerHTML =  compare_price_data + this.subtotalPrice;
            
          }
          // else{
          //   console.log('aaaabbbb',i);
          //   document.getElementById('ccmmpp').innerHTML = "dsgdsgdf";
          // }
          // document.getElementById("ccmmpp").innerHTML = '$'+ compare_price_data;
          
        })
        .catch((error) => {
          console.error('Error:', error);
        })
       
        
 }
      // var comp_data=this.items[0].handle;
      // console.log('comp_datacomp_data',lent.length);
      // var comp_url='http://127.0.0.1:9292/products/'+ comp_data +'.json'
      // console.log('thisthis',comp_url);
      // fetch(comp_url)
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   return response.json();
      // })
      // .then((data) => {
      //   // Process the retrieved data
      //   const compare_price_data = data.product.variants[0].compare_at_price;
      //   // window.comp = compare_price_data;
      //   document.getElementById("ccmmpp").innerHTML = '$'+ compare_price_data;
      //   console.log(compare_price_data,'compare_price_data');
      //   // console.log(data.product.variants[0].compare_at_price,'datata');
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      // });
     
      this.items.map(
        (item) =>
        
        // console.log('item',item)
          (this.cartContainer.innerHTML += `
            <div class="upsell__cart-cart-item upsell__cart-cart-item_back">
              <div class="upsell__cart-image">
                <img src="${item.image}" alt="" />
              </div>
              <div class="upsell__cart-title-qty">
                <div>
                  <strong class="strong">${item.title}</strong>
                  ${item.variant_title ? `<span class="varient_tittle_backend">${item.variant_title}</span>` : ""}
                  <span class="upsell__cart-price_1 instant_discount" id="${item.id}instant_discount"><span>
                  
                </div>
                ${item.color ? `<div class="color">${item.color}</div>` : ""}
                ${
                  item.discount === true
                    ? `<div class="upsell__cart-discount">Instant discount!</div>`
                    : ""
                }
                <div class="qty">
                <span class='number-wrapper'>
                  <input
                  class="input_number"
                    type="number"
                    name=""
                    id=""
                    value="${item.quantity}"
                    onchange="window.__upsellCart.changeQty(this, ${item.id})"
                  />
                  </span>
                  

                </div>
              </div>
              <div class="upsell__cart-clear-price">
                <div class="clear">
                  <button onclick="window.__upsellCart.removeItem(${item.id})"></button>
                </div>
                
                <div class="upsell__cart-price_1">
                  ${
                    item.discount === true
                      ? `<s>`+window.money+`${ self.roundPrice(item.quantity * item.discounted_price/100) }</s>`
                      : window.money+`${ self.roundPrice(item.quantity * item.price/100) }`
                  }
                </div>
                ${
                 
                  item.discount === true
                    ? `<div class="upsell__cart-discount">`+window.money+` ${self.roundPrice(
                        item.quantity * item.price/100
                      )}</div>`
                    : ` <del class="upsell__cart-discount_1" id="${item.id}"></del>`
                }
              </div>
            </div>
        `)
      );
    }
    
    this.countSubtotal(items);
    //console.log(this.subtotalPrice);
    this.countTiers(this.subtotalPrice, this.tiers);
    this.discountLabel();
    this.emptyCart();
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
    document.querySelector('[vid="'+e+'"]').closest('.upsell__cart-upsell2-item').classList.add("addedtoqueue")
  }
  
  changeQty(e, id) {
    const item = this.items.find((item) => item.id === id);
    item.quantity = parseInt(e.value);
    this.drawCartItems(this.items);
    var num = item.id;
    var text = num.toString();
    var data = {"id": text, "quantity": e.value};
    if(e.value == 0){
      this.removeItem(num)
    }else{
      this.changeItms(data)
    }
    
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
    document.querySelector('[vid="'+id+'"]').closest('.upsell__cart-upsell2-item').classList.remove("addedtoqueue")
    
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
 upsellVoptn(elm){
    var vid = elm.value;
     var natr = `window.__upsellCart.addItem(`+vid+`)`;
    elm.parentNode.parentNode.querySelector(".addrecomd").setAttribute("onclick",natr );
     elm.parentNode.parentNode.querySelector(".addrecomd").setAttribute("vid",vid );
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
  upsellConti(){
    if(window.UpsellCart.continue_shopping.redirect_option == "close_cart"){
      window.__upsellCart.drawerClose();
    }else if(window.UpsellCart.continue_shopping.redirect_option == "redirecturi"){
      window.location.href = window.UpsellCart.continue_shopping.redirect_url;
    }
}
  
  countSubtotal(items) {
    console.log('itemsss',this.items);
    const ddcct = document.getElementById('subtotal_dis_id');
    console.log('ddcct', ddcct)
    const itemsContainer = document.getElementById("subtotalItems");
    const priceContainer = document.getElementById("subtotalPrice");
    const singleitm = window.UpsellCart.language.subtotal_text_one_item;
    const manyitms = window.UpsellCart.language.subtotal_text_many_item;
    
    const qty = this.subtotalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
    this.subtotalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price/100, 0);
    
    itemsContainer.innerHTML = `${
        this.subtotalItems === 1 ? singleitm.replace('{{ item_count }}',qty) : manyitms.replace('{{ item_count }}',qty)
    }`;
    
    priceContainer.innerHTML = `<span class="discount">`+window.money+`${this.roundPrice(
        this.subtotalPrice
    )}</span> <del id="subtotal_dis_id"></del>`;
    // <s>${ this.roundPrice(this.subtotalPrice  * 1.2) } </s>
    // document.querySelector(".discount").style.color = "hsl("+window.UpsellCart.checkout_btn_settings.checking_out_color.hue+",90%,50%)";
  }
  
  countTiers(subtotalPrice, tiers) {
      var amt = [];
      
    const hintContainer = document.getElementById("progressHint");
    const barContainer = document.getElementById("progressBar");
    const btnclr = "background:"+hsbaToRgb( window.UpsellCart.progress_bar_color.hue, window.UpsellCart.progress_bar_color.saturation, window.UpsellCart.progress_bar_color.brightness, window.UpsellCart.progress_bar_color.alpha)+"";
    if(window.UpsellCart.tiered_progress_bar == true){
       for(var k=0;k<window.UpsellCart.tiered_progress_bar_tabs.length;k++){
        if(window.country == window.UpsellCart.tiered_progress_bar_tabs[k].country){
          
          const layout = window.UpsellCart.tiered_progress_bar_tabs[k].layout_type;
          const alltiers = window.UpsellCart.tiered_progress_bar_tabs[k].tier.length;
          const gifts = document.querySelector(".upsell__cart-gifts");
          //document.getElementById("freegifts").innerHTML = '';
          //document.getElementById("giftlayout").innerHTML = '';
         
          gifts.innerHTML = '';
          
          for(var i=0;i<alltiers;i++){
              const free = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].type;
              const ship = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].free_shipping_all_products;
              const minprice = window.UpsellCart.tiered_progress_bar_tabs[k].tier[i].min_price;
              amt.push(minprice)
              const max = Math.max(...amt);
              if(free =='free_shipping'){
                  var svg = `<svg width="11" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.82415 6.15237L0.726419 4.05464L0.012085 4.76395L2.82415 7.57601L8.86078 1.53938L8.15147 0.830078L2.82415 6.15237Z" fill="#8494A0"></path></svg>`;
                  var title = "Free Shipping";
              }else{
                  var svg = `<svg width="14" height="12" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7808 3.71012H10.9961C10.9961 1.73797 9.39873 0.140625 7.42658 0.140625C5.45444 0.140625 3.85709 1.73797 3.85709 3.71012H2.07234C1.09073 3.71012 0.287598 4.51325 0.287598 5.49486V16.2033C0.287598 17.185 1.09073 17.9881 2.07234 17.9881H12.7808C13.7624 17.9881 14.5656 17.185 14.5656 16.2033V5.49486C14.5656 4.51325 13.7624 3.71012 12.7808 3.71012ZM7.42658 1.92537C8.40819 1.92537 9.21133 2.72851 9.21133 3.71012H5.64184C5.64184 2.72851 6.44497 1.92537 7.42658 1.92537ZM12.7808 16.2033H2.07234V5.49486H3.85709V7.27961C3.85709 7.77042 4.25866 8.17198 4.74946 8.17198C5.24027 8.17198 5.64184 7.77042 5.64184 7.27961V5.49486H9.21133V7.27961C9.21133 7.77042 9.6129 8.17198 10.1037 8.17198C10.5945 8.17198 10.9961 7.77042 10.9961 7.27961V5.49486H12.7808V16.2033Z" fill="#8494A0"></path></svg>`;
                  var title = "Mystery Gift";
              }
            
              gifts.insertAdjacentHTML('beforeend',`<div class="upsell__cart-gift-item" id="`+minprice+`">
              <div class="upsell__cart-icon">`+svg+`</div><strong>`+title+`</strong></div>`);
             
              if(subtotalPrice >= minprice){
                document.getElementById(""+minprice+"").classList.add("active");
                //hintContainer.innerHTML = "You are "+(subtotalPrice - minprice)+" away from free shipping";
              }else{
                document.getElementById(""+minprice+"").classList.remove("active");
              }
             
                var pertcnt = subtotalPrice/max*100;
                barContainer.style = `width: `+pertcnt+`%;`+btnclr+``;
                
              if(free == "free_shipping" && subtotalPrice >= minprice){
                  document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
              }
              else if(free == "product" && subtotalPrice >= minprice){
                  document.getElementById(""+minprice+"").querySelector(".upsell__cart-icon").classList.add("active");
              }
             
          }
          for(var m=0;m<alltiers;m++){
            const free = window.UpsellCart.tiered_progress_bar_tabs[k].tier[m].type;
            const minprice = window.UpsellCart.tiered_progress_bar_tabs[k].tier[m].min_price;
            const label_1 = '<span id="label_font_weight">' + window.UpsellCart.tiered_progress_bar_tabs[k].tier[m].label+'</span>';
            const label_font_weight = window.UpsellCart.tiered_progress_bar_tabs[k].tier[m].label_font_weight;
            // label_1.style.fontWeight = window.UpsellCart.tiered_progress_bar_tabs[k].tier[m].label_font_weight;
            // document.getElementById("upsell_prev_styl").innerHTML= `<style>

            // </style>`
            console.log('free',free , minprice ,label_1, subtotalPrice)
            if(minprice-subtotalPrice > 0){
             
              if(free == "free_shipping" && subtotalPrice < minprice){
                  hintContainer.innerHTML = "You are "+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >" + (label_1) + " </b>";
                  
                  break;
              }
              else if(free == "product" && subtotalPrice < minprice){
                  hintContainer.innerHTML = "You are $"+(minprice - subtotalPrice ).toFixed(2)+" away from <b style= "  + "font-weight:" + (label_font_weight) +" >"+ (label_1) + " </b>" ;
                  break;
              }
             
            }else{
              hintContainer.innerHTML = "You unlock all <b>FREE GIFT<b\>";
            }

          }
        }
       }
        
     }
 
  }

announSlide(){
    const slideContainer = document.querySelector('.upsell__cart-message');
    const slide = document.querySelector('#upsell_mslide');
    const interval = (window.UpsellCart.announcement_settings.speed);

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
  if(window.UpsellCart.general_settings_status == true){
    document.querySelector('html head').insertAdjacentHTML(`beforeend`,`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=`+window.UpsellCart.general_settings.font_family+`">`)
  }
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
    parnt.classList.add("upsell_animate");
    setTimeout(function(){
      parnt.classList.remove("upsell_animate");
      parnt.insertAdjacentHTML('beforeend',nxt);
      parnt.querySelector(".upsell__cart-upsell2-item").remove();
        
    },300);
   
}
function shopAll(){
  window.location.href = "/collections/all";
}

function prevSlide(elem){
    var parnt =  elem.parentNode.querySelector('.crousl');
    console.log(elem.parentNode)
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

let styles = hsbaToRgb( window.UpsellCart.progress_bar_color.hue, window.UpsellCart.progress_bar_color.saturation, window.UpsellCart.progress_bar_color.brightness, window.UpsellCart.progress_bar_color.alpha);

var viewclr = hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha);
 
var empcart = `
 font-size:`+window.UpsellCart.cart_empty.button_font_size+`px;
 font-weight:`+window.UpsellCart.cart_empty.button_font_weight+`;
 background:`+hsbaToRgb( window.UpsellCart.cart_empty.button_color.hue, window.UpsellCart.cart_empty.button_color.saturation, window.UpsellCart.cart_empty.button_color.brightness, window.UpsellCart.cart_empty.button_color.alpha)+`;
 color:`+hsbaToRgb( window.UpsellCart.cart_empty.button_font_color.hue, window.UpsellCart.cart_empty.button_font_color.saturation, window.UpsellCart.cart_empty.button_font_color.brightness, window.UpsellCart.cart_empty.button_font_color.alpha)+`;
 margin: 15px;
 padding: 8px;
 border: 1px solid;
 cursor: pointer;
 display: block;
 text-decoration: none;
`;

var empcarthover = hsbaToRgb( window.UpsellCart.cart_empty.button_high_color.hue, window.UpsellCart.cart_empty.button_high_color.saturation, window.UpsellCart.cart_empty.button_high_color.brightness, window.UpsellCart.cart_empty.button_high_color.alpha);
var customcode = '';
if(window.UpsellCart.custom_code_status == true){
  customcode = window.UpsellCart.custom_code;
}
var appstyle = `<style>
.upsell__cart-icon.active{
  background:`+styles+`;
}
.empty_upsell_coll a{
  `+empcart+`
}
.empty_upsell_coll a:hover{
  background:`+empcarthover+`;
}
#viewcart a{
  background: `+viewclr+`;
}
#continueshop a{
  `+viewclr+`
}
.addrecomd{
  background : `+hsbaToRgb( window.UpsellCart.buy_more.button_color.hue, window.UpsellCart.buy_more.button_color.saturation, window.UpsellCart.buy_more.button_color.brightness, window.UpsellCart.buy_more.button_color.alpha)+`;
}
.btn-primary{
  background : `+hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha)+`;
}
button#viewCartButton a{
  color:`+hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha)+`;
  text-decoration: none;
}
button.btn-primary{
  border: 2px solid `+hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha)+`;
}
button.btn-secondary{
  border: 2px solid `+hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha)+`;
}
.upsell__cart-cart-item button{
  background : `+hsbaToRgb( window.UpsellCart.buy_more.button_color.hue, window.UpsellCart.buy_more.button_color.saturation, window.UpsellCart.buy_more.button_color.brightness, window.UpsellCart.buy_more.button_color.alpha)+`;
}
.upsell_announctop.deactivated{
  display:none;
}
div#upsell_continueshop span{
  background: `+hsbaToRgb( window.UpsellCart.checkout_btn_settings.checking_out_color.hue, window.UpsellCart.checkout_btn_settings.checking_out_color.saturation, window.UpsellCart.checkout_btn_settings.checking_out_color.brightness, window.UpsellCart.checkout_btn_settings.checking_out_color.alpha)+`;
  color: #fff;
  text-align: center;
  padding: 7px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
}
div#upsell_continueshop span{
  font-size:`+window.UpsellCart.continue_shopping.font_size+`px;
  font-weight:`+window.UpsellCart.continue_shopping.font_weight+`;
  color:`+hsbaToRgb( window.UpsellCart.continue_shopping.font_color.hue, window.UpsellCart.continue_shopping.font_color.saturation, window.UpsellCart.continue_shopping.font_color.brightness, window.UpsellCart.continue_shopping.font_color.alpha)+`;
}
.upsell_disount_input input.addrecomd{
  font-size:`+window.UpsellCart.discount_input.button_font_size+`px;
  font-weight:`+window.UpsellCart.discount_input.button_font_weight+`;
  background:`+hsbaToRgb( window.UpsellCart.discount_input.button_color.hue, window.UpsellCart.discount_input.button_color.saturation, window.UpsellCart.discount_input.button_color.brightness, window.UpsellCart.discount_input.button_color.alpha)+`;
  color:`+hsbaToRgb( window.UpsellCart.discount_input.button_font_color.hue, window.UpsellCart.discount_input.button_font_color.saturation, window.UpsellCart.discount_input.button_font_color.brightness, window.UpsellCart.discount_input.button_font_color.alpha)+`;
}
input#upsell_discinp{
  font-size:`+window.UpsellCart.discount_input.label_font_size+`px;
  font-weight:`+window.UpsellCart.discount_input.label_font_weight+`;
  background:`+hsbaToRgb( window.UpsellCart.discount_input.label_color.hue, window.UpsellCart.discount_input.label_color.saturation, window.UpsellCart.discount_input.label_color.brightness, window.UpsellCart.discount_input.label_color.alpha)+`;
  color:`+hsbaToRgb( window.UpsellCart.discount_input.label_font_color.hue, window.UpsellCart.discount_input.label_font_color.saturation, window.UpsellCart.discount_input.label_font_color.brightness, window.UpsellCart.discount_input.label_font_color.alpha)+`;
}
textarea#rebuy-cart-notes{
  font-size:`+window.UpsellCart.note_input.font_size+`px;
  font-weight:`+window.UpsellCart.note_input.font_weight+`;
  height:`+window.UpsellCart.note_input.inputsize+`px;
  color:`+hsbaToRgb( window.UpsellCart.note_input.font_color.hue, window.UpsellCart.note_input.font_color.saturation, window.UpsellCart.note_input.font_color.brightness, window.UpsellCart.note_input.font_color.alpha)+`;
  background:`+hsbaToRgb( window.UpsellCart.note_input.color.hue, window.UpsellCart.note_input.color.saturation, window.UpsellCart.note_input.color.brightness, window.UpsellCart.note_input.color.alpha)+`;
}
textarea#rebuy-cart-notes::placeholder{
  color:`+hsbaToRgb( window.UpsellCart.note_input.font_color.hue, window.UpsellCart.note_input.font_color.saturation, window.UpsellCart.note_input.font_color.brightness, window.UpsellCart.note_input.font_color.alpha)+`;
}
.upsell--cart{
  border-radius:`+window.UpsellCart.general_settings.border_radius+`px;
  font-family:`+window.UpsellCart.general_settings.font_family+`;
}
.upsell__cart-header{
  padding:`+window.UpsellCart.general_settings.header_padding+`px;
}
.upsell__cart-footer{
  padding:`+window.UpsellCart.general_settings.footer_padding+`px;
}
.upsell__cart-cart-item {
  background: #fff;
}
.upsell__cart-header{
  background:`+hsbaToRgb( window.UpsellCart.general_settings.header_background.hue, window.UpsellCart.general_settings.header_background.saturation, window.UpsellCart.general_settings.header_background.brightness, window.UpsellCart.general_settings.header_background.alpha)+`;
}
.upsell__cart-content{
  background:`+hsbaToRgb( window.UpsellCart.general_settings.main_background.hue, window.UpsellCart.general_settings.main_background.saturation, window.UpsellCart.general_settings.main_background.brightness, window.UpsellCart.general_settings.main_background.alpha)+`;
}
.upsell__cart-footer{
  background:`+hsbaToRgb( window.UpsellCart.general_settings.footer_background.hue, window.UpsellCart.general_settings.footer_background.saturation, window.UpsellCart.general_settings.footer_background.brightness, window.UpsellCart.general_settings.footer_background.alpha)+`;
}
.upsell__cart-upsell2{
  background:`+hsbaToRgb( window.UpsellCart.general_settings.main_background.hue, window.UpsellCart.general_settings.main_background.saturation, window.UpsellCart.general_settings.main_background.brightness, window.UpsellCart.general_settings.main_background.alpha)+`;
}

div#newwidget{
  background:`+hsbaToRgb( window.UpsellCart.general_settings.main_background.hue, window.UpsellCart.general_settings.main_background.saturation, window.UpsellCart.general_settings.main_background.brightness, window.UpsellCart.general_settings.main_background.alpha)+`;
}
`+customcode+`
</style>`;
const abc = document.querySelector("body");
abc.insertAdjacentHTML('afterbegin',appstyle);
  
window.__upsellCart = new upsellCart();

console.log(' data:' , window.UpsellCart.benefit.background_color);



const domain_url= "https://01cd-2405-201-5802-4c37-7c05-a35b-36e3-e191.ngrok-free.app/";

// const domain_url = "https://cart.brandlift.io/";



if(window.UpsellCart.trust_badge.src != ""){
  document.querySelector('.cart__trusted-payment') && document.querySelector('.cart__trusted-payment').remove()
  const trustElement = document.createElement('div');
  // trustElement.style=`padding:${window.UpsellCart.trust_badge.padding};margin:${window.UpsellCart.trust_badge.margin};`;
  trustElement.className='cart__trusted-payment';
//   var imageUrl = 'https://d991-2405-201-5802-4c37-3d3d-fcd5-fc61-e95f.ngrok-free.app/api/uploads/1686054316876.png'; // Replace with the URL of your image

// var imgElement = document.createElement('img');
// imgElement.src = imageUrl;


// var containerElement = document.getElementById('ccnntt'); // Replace 'container' with the ID of the element where you want to insert the image
// containerElement.innerHTML = ''; // Clear the container if needed
// containerElement.appendChild(imgElement);
    

   trustElement.innerHTML = `<img src="${domain_url}api/uploads/${window.UpsellCart.trust_badge.src}" style="width:${window.UpsellCart.trust_badge.width}%;" />`;


  document.getElementById("afterpayBottom").insertAdjacentElement('afterend', trustElement);
}

console.log('benfitssss',window.UpsellCart.benefit)


if(window.UpsellCart.benefit.benefits.length){
 
  document.querySelector('.cart-benefits') && document.querySelector('.cart-benefits').remove();
  const benefitsElement = document.createElement('div');
  benefitsElement.style=`background-color:${window.UpsellCart.benefit.background_color};padding:${window.UpsellCart.benefit.section_padding};${window.UpsellCart.benefit.layout == 'inline' ? 'grid-template-columns: 1fr 1fr;' : 'grid-template-columns: 1fr 1fr 1fr 1fr;'}`;
  benefitsElement.className='cart-benefits';
  benefitsElement.innerHTML = window.UpsellCart.benefit.benefits.map(function(benefit){
    return `<div class="cart-benefits_item">
      <img src="${domain_url}/api/uploads/${benefit.image}" style="width:${benefit.size}px;padding:${benefit.image_padding};margin:${benefit.image_margin};" />
      <div style="font-size: ${benefit.font_size}px;font-weight: ${benefit.font_weight};color:${benefit.font_color};">${benefit.text}</div>
    </div>`;
  }).join('');
  // <img src="https://cdn.shopify.com/s/files/1/0735/6062/1332/files/1686051217479.png?v=1686566023"
  document.querySelector(".upsell2").appendChild(benefitsElement);
}


if(window.UpsellCart.testimonial.testimonials.length){
  document.querySelector('.cart-testimonials') && document.querySelector('.cart-testimonials').remove();
  const testimonialsElement = document.createElement('div');
  testimonialsElement.style=`background-color:${window.UpsellCart.testimonial.background_color};padding:${window.UpsellCart.testimonial.section_padding};`;
  testimonialsElement.className='cart-testimonials';
  // ${testimonial.image? `<img src="https://cdn.shopify.com/s/files/1/0735/6062/1332/files/1686054159898.jpg?v=1686565921" style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};" />${item.color}</div>` : ""}
 


  // \\\\\\19 june\\\\\\\

  // <div class="mySlides cart-testimonials_item_inner">
  // ${ testimonial.image? `<div class="mySlides_img"><img src="${domain_url}api/uploads/${testimonial.image}" style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};" /></div>` : `<span style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};"></span>` }
  //   <div class="cart-testimonials_content">
  //     <p >${testimonial.review}</p>
  //     <b class="cart-testimonials_name" >${testimonial.name}</b>
  //     <div class="cart-testimonials_date">Verified Purchase ${testimonial.order_date}</div>
  //     ${ testimonial.star? `<img src="https://ucarecdn.com/865b5d7a-31d3-4e8c-9e24-129571a604c0/-/format/auto/-/preview/120x120/-/quality/lightest/"  />` : '' }
  //   </div>
  // </div>

 
 
 
 
 
  var testimonial_map = window.UpsellCart.testimonial.testimonials.map(function(testimonial){
    return `
    
<div class="slider-content__item ">
      
      ${ testimonial.image? `<div class="mySlides_img"><img src="${domain_url}api/uploads/${testimonial.image}" style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};" /></div>` : `<span style="width:${testimonial.size}px;padding:${testimonial.image_padding};margin:${testimonial.image_margin};"></span>` }
        <div class="cart-testimonials_content">
          <p >${testimonial.review}</p>
          <b class="cart-testimonials_name" >${testimonial.name}</b>
          <div class="cart-testimonials_date">Verified Purchase ${testimonial.order_date}</div>
          ${ testimonial.star? `<img src="https://ucarecdn.com/865b5d7a-31d3-4e8c-9e24-129571a604c0/-/format/auto/-/preview/120x120/-/quality/lightest/"  />` : '' }
      </div>
    </div>
    
    `;

    
  }).join('');
  testimonialsElement.innerHTML = `
	<div id="slider" class="slider">
		<div class="slider-content">
			<div class="slider-content-wrapper">`+ testimonial_map + `	</div>
      </div>
    </div>`

{/* <a class="prev" onclick="plusSlides(-1)">❮</a><a class="next" onclick="plusSlides(1)">❯</a> */}

  if(window.UpsellCart.testimonial.position == "top"){
    document.querySelector(".upsell2").prepend(testimonialsElement);
  }else{
    document.querySelector(".upsell2").appendChild(testimonialsElement);
  }

  // document.getElementByClassName("cart-testimonials").innerHTML +=`<a class="prev" onclick="plusSlides(-1)">❮</a> <a class="next" onclick="plusSlides(1)">❯</a>`;


document.getElementById("upsell_prev_styl").innerHTML= `<style>
.subtotal .subtotal-items{color:${window.UpsellCart.general_settings.subtotal_color};font-family:${window.UpsellCart.general_settings.subtotal_font};}
div#subtotalPrice{font-family:${window.UpsellCart.general_settings.price_font};}
.subtotal .discount{color:${window.UpsellCart.general_settings.price_color};}
div#subtotalPrice s{color:${window.UpsellCart.general_settings.compare_price_color};}
.upsell__cart-title-qty .strong{color:${window.UpsellCart.general_settings.cartitem.title_color}; font-size:${window.UpsellCart.general_settings.cartitem.title_size}; font-weight: ${window.UpsellCart.general_settings.cartitem.title_weight};}
.upsell__cart-price{font-size:${window.UpsellCart.general_settings.cartitem.price_size}; font-weight: ${window.UpsellCart.general_settings.cartitem.price_weight};}
.upsell__cart-price_1{font-size:${window.UpsellCart.general_settings.cartitem.price_size}; color:${window.UpsellCart.general_settings.cartitem.price_color};  font-weight: ${window.UpsellCart.general_settings.cartitem.price_weight};}
.upsell__cart-discount_1{font-size:${window.UpsellCart.general_settings.cartitem.discount_size}; color:${window.UpsellCart.general_settings.cartitem.discount_color};  font-weight: ${window.UpsellCart.general_settings.cartitem.discount_weight};}
.upsell__cart-cart-item_back{background:${window.UpsellCart.general_settings.cartitem.background_color};  }
.varient_tittle_backend{font-size:${window.UpsellCart.general_settings.cartitem.variant_size}; color:${window.UpsellCart.general_settings.cartitem.variant_color};  font-weight: ${window.UpsellCart.general_settings.cartitem.variant_weight};}
.cart__trusted-payment{width:100%; float:left; margin:${window.UpsellCart.trust_badge.margin}; padding:${window.UpsellCart.trust_badge.padding}; text-align:${window.UpsellCart.trust_badge.position};}
.cart-testimonials_content p{color:${window.UpsellCart.testimonial.review_font_color}; font-size:${window.UpsellCart.testimonial.review_font_size} ; font-weight:${window.UpsellCart.testimonial.review_font_weight} ; font-style:${window.UpsellCart.testimonial.review_font_style} ;}
.cart-testimonials_content b{color:${window.UpsellCart.testimonial.customer_font_color}; font-size:${window.UpsellCart.testimonial.customer_font_size} ; font-weight:${window.UpsellCart.testimonial.customer_font_weight} ; font-style:${window.UpsellCart.testimonial.customer_font_style} ;}
.cart-testimonials_content .cart-testimonials_date{color:${window.UpsellCart.testimonial.order_font_color}; font-size:${window.UpsellCart.testimonial.order_font_size} ; font-weight:${window.UpsellCart.testimonial.order_font_weight} ; font-style:${window.UpsellCart.testimonial.order_font_style} ;}
.upsell_announctop{padding:${window.UpsellCart.announcement_settings.padding}; margin:${window.UpsellCart.announcement_settings.margin};}




</style>`;
}




// .upsell_announctop{

// console.log('aaaaaa',window.UpsellCart.tiered_progress_bar_tabs)
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
 
//   slides[slideIndex-1].style.display = "block";  
// }




const slider = (function(){
	
	//const
	const slider = document.getElementById("slider"); // основная обертка
	console.log(slider);
	const sliderContent = document.querySelector(".slider-content"); // обертка для контейнера слайдов и контролов
	console.log(sliderContent);
	const sliderWrapper = document.querySelector(".slider-content-wrapper"); // контейнер для слайдов
	const elements = document.querySelectorAll(".slider-content__item"); // обертка для слайда
	const sliderContentControls = createHTMLElement("div", "slider-content__controls"); // блок контролов внутри sliderContent
	let dotsWrapper = null; // Обертка dots
	let prevButton = null; // Кнопки
	let nextButton = null;
	let autoButton = null;
	let leftArrow = null; // Стрелки
	let rightArrow = null;
	let intervalId = null; //идентификатор setInterval
	
	// data
	const itemsInfo = {
		offset: 0, // смещение контейнера со слайдами относительно начальной точки (первый слайд)
		position: {
			current: 0, // номер текущего слайда
			min: 0, // первый слайд
			max: elements.length - 1 // последний слайд	
		},
		intervalSpeed: 2000, // Скорость смены слайдов в авторежиме

		update: function(value) {
			this.position.current = value;
			this.offset = -value;
		},
		reset: function() {
			this.position.current = 0;
			this.offset = 0;
		}	
	};

	const controlsInfo = {
		buttonsEnabled: false,
		dotsEnabled: false,
		prevButtonDisabled: true,
		nextButtonDisabled: false
	};

	// Инициализация слайдера
	function init(props) {
		// let {buttonsEnabled, dotsEnabled} = controlsInfo;
		let {intervalSpeed, position, offset} = itemsInfo;
		
		// Проверка наличия элементов разметки
		if (slider && sliderContent && sliderWrapper && elements) {
			// Проверка входных параметров
			if (props && props.intervalSpeed) {
				intervalSpeed = props.intervalSpeed;
			}
			if (props && props.currentItem) {
				if ( parseInt(props.currentItem) >= position.min && parseInt(props.currentItem) <= position.max ) {
					position.current = props.currentItem;
					offset = - props.currentItem;	
				}
			}
			if (props && props.buttons) {
				controlsInfo.buttonsEnabled = true;
			}
			if (props && props.dots) {
				controlsInfo.dotsEnabled = true;
			}
			
			_updateControlsInfo();
			_createControls(controlsInfo.dotsEnabled, controlsInfo.buttonsEnabled);
			_render();	
		} else {
			console.log("Разметка слайдера задана неверно. Проверьте наличие всех необходимых классов 'slider/slider-content/slider-wrapper/slider-content__item'");
		}
	}

	// Обновить свойства контролов
	function _updateControlsInfo() {
		const {current, min, max} = itemsInfo.position;
		controlsInfo.prevButtonDisabled = current > min ? false : true;
		controlsInfo.nextButtonDisabled = current < max ? false : true;
	}

	// Создание элементов разметки
	function _createControls(dots = false, buttons = false) {
		
		//Обертка для контролов
		sliderContent.append(sliderContentControls);

		// Контролы
		createArrows();
		buttons ? createButtons() : null;
		dots ? createDots() : null;
		
		// Arrows function
		function createArrows() {
			const dValueLeftArrow = "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z";
			const dValueRightArrow = "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z";
			const leftArrowSVG = createSVG(dValueLeftArrow);
			const rightArrowSVG = createSVG(dValueRightArrow);
			
			leftArrow = createHTMLElement("div", "prev-arrow");
			leftArrow.append(leftArrowSVG);
			leftArrow.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current - 1))
			
			rightArrow = createHTMLElement("div", "next-arrow");
			rightArrow.append(rightArrowSVG);
			rightArrow.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current + 1))

			sliderContentControls.append(leftArrow, rightArrow);
			
			// SVG function
			function createSVG(dValue, color="currentColor") {
				const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute("viewBox", "0 0 16 16");
				const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				path.setAttribute("fill", color);
				path.setAttribute("d", dValue);
				svg.appendChild(path);	
				return svg;
			}
		}

		// Dots function
		function createDots() {
			dotsWrapper = createHTMLElement("div", "dots");			
			for(let i = 0; i < itemsInfo.position.max + 1; i++) {
				const dot = document.createElement("div");
				dot.className = "dot";
				dot.addEventListener("click", function() {
					updateItemsInfo(i);
				})
				dotsWrapper.append(dot);		
			}
			sliderContentControls.append(dotsWrapper);	
		}
		
		// Buttons function
		// function createButtons() {
		// 	const controlsWrapper = createHTMLElement("div", "slider-controls");
		// 	prevButton = createHTMLElement("button", "prev-control", "Prev");
		// 	prevButton.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current - 1))
			
		// 	autoButton = createHTMLElement("button", "auto-control", "Auto");
		// 	autoButton.addEventListener("click", () => {
		// 		intervalId = setInterval(function(){
		// 			if (itemsInfo.position.current < itemsInfo.position.max) {
		// 				itemsInfo.update(itemsInfo.position.current + 1);
		// 			} else {
		// 				itemsInfo.reset();
		// 			}
		// 			_slideItem();
		// 		}, itemsInfo.intervalSpeed)
		// 	})

		// 	nextButton = createHTMLElement("button", "next-control", "Next");
		// 	nextButton.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current + 1))

		// 	controlsWrapper.append(prevButton, autoButton, nextButton);
		// 	slider.append(controlsWrapper);
		// }
	}

	// Задать класс для контролов (buttons, arrows)
	function setClass(options) {
		if (options) {
			options.forEach(({element, className, disabled}) => {
				if (element) {
					disabled ? element.classList.add(className) : element.classList.remove(className)	
				} else {
					console.log("Error: function setClass(): element = ", element);
				}
			})
		}
	}

	// Обновить значения слайдера
	function updateItemsInfo(value) {
		itemsInfo.update(value);
		_slideItem(true);	
	}

	// Отобразить элементы
	function _render() {
		const {prevButtonDisabled, nextButtonDisabled} = controlsInfo;
		let controlsArray = [
			{element: leftArrow, className: "d-none", disabled: prevButtonDisabled},
			{element: rightArrow, className: "d-none", disabled: nextButtonDisabled}
		];
		if (controlsInfo.buttonsEnabled) {
			controlsArray = [
				...controlsArray, 
				{element:prevButton, className: "disabled", disabled: prevButtonDisabled},
				{element:nextButton, className: "disabled", disabled: nextButtonDisabled}
			];
		}
		
		// Отображаем/скрываем контроллы
		setClass(controlsArray);

		// Передвигаем слайдер
		sliderWrapper.style.transform = `translateX(${itemsInfo.offset*100}%)`;	
		
		// Задаем активный элемент для точек (dot)
		if (controlsInfo.dotsEnabled) {
			if (document.querySelector(".dot--active")) {
				document.querySelector(".dot--active").classList.remove("dot--active");	
			}
			dotsWrapper.children[itemsInfo.position.current].classList.add("dot--active");
		}
	}

	// Переместить слайд
	function _slideItem(autoMode = false) {
		if (autoMode && intervalId) {
			clearInterval(intervalId);
		}
		_updateControlsInfo();
		_render();
	}

	// Создать HTML разметку для элемента
	function createHTMLElement(tagName="div", className, innerHTML) {
		const element = document.createElement(tagName);
		className ? element.className = className : null;
		innerHTML ? element.innerHTML = innerHTML : null;
		return element;
	}

	// Доступные методы
	return {init};
}())

slider.init({
	// intervalSpeed: 1000,
	currentItem: 0,
	buttons: true,
	dots: true
});