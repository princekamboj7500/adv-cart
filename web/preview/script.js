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


