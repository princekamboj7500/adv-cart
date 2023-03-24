class upsellCart{
  constructor() {
    this.subtotalItems = 0;
    this.subtotalPrice = 0;
    this.items = [
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
    this.tiers = [100, 200, 300];

    // Show/Hide "View Cart" Button
    const showViewCartButton = false;
    !showViewCartButton &&
      document.getElementById("viewCartButton").classList.add("upsell__cart-hidden");

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
    !upsellList && document.querySelector(".upsell").classList.add("upsell__cart-hidden");
    !upsellCarousel && document.querySelector(".upsell2").classList.add("upsell__cart-hidden");

    this.cartMainContainer = document.querySelector(".upsell--cart");
    this.cartContainer = document.getElementById("cartItems");
    this.drawCartItems();
  }

  drawerOpen(){
    this.cartMainContainer.classList.remove("upsell__cart-close");
  }

  drawerClose(){
    this.cartMainContainer.classList.add("upsell__cart-close");
  }

  drawCartItems(items) {
    this.cartContainer.innerHTML = "";
  
    if (this.items.length === 0) {
      this.cartContainer.innerHTML += `
        <div class="empty-cart">
          <div class="upsell__cart-title">Your Cart is empty!</div>
          <div class="upsell__cart-subtitle">Add your favorite items to your cart.</div>
          <button class="btn-primary">Shop Now</button>
        </div>
      `;
    } else {
      var self = this;
      this.items.map(
        (item) =>
          (this.cartContainer.innerHTML += `
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
                        item.qty * item.price
                      )}</div>`
                    : ""
                }
                <div class="upsell__cart-price">
                  ${
                    item.discount === true
                      ? `<s>$${ self.roundPrice(item.qty * item.oldPrice) }</s>`
                      : `$${ self.roundPrice(item.qty * item.price) }`
                  }
                </div>
              </div>
            </div>
        `)
      );
    }
  
    this.countSubtotal(items);
    console.log(this.subtotalPrice);
    this.countTiers(this.subtotalPrice, this.tiers);
  }
  
  addItem() {
    this.items.push({
      id: Math.random(),
      imageSrc: "images/cart-item.png",
      title: "The Magic Teeth Whitening Strips®",
      color: "Black",
      discount: false,
      qty: 1,
      oldPrice: 0,
      price: 79.99,
    });
    this.drawCartItems(this.items);
  }
  
  changeQty(e, id) {
    const item = this.items.find((item) => item.id === id);
    item.qty = parseInt(e.value);
    this.drawCartItems(this.items);
  }
  
  removeItem(id) {
    const filteredItems = this.items.filter((item) => item.id !== id);
    this.items = filteredItems;
    this.drawCartItems(this.items);
  }
  
  cleanCart(event) {
    event.preventDefault();
    this.items = [];
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
  
    this.subtotalItems = this.items.reduce((acc, item) => acc + item.qty, 0);
    this.subtotalPrice = this.items.reduce((acc, item) => acc + item.qty * item.price, 0);
  
    itemsContainer.innerHTML = `Subtotal (${this.subtotalItems} item${
      this.subtotalItems === 1 ? "" : "s"
    })`;
    priceContainer.innerHTML = `<span class="discount">$${ this.roundPrice(
      this.subtotalPrice
    )}</span><s>${ this.roundPrice(this.subtotalPrice  * 1.2) }</s>`;
  }
  
  countTiers(subtotalPrice, tiers) {
    const hintContainer = document.getElementById("progressHint");
    const barContainer = document.getElementById("progressBar");
    const freeShippingIcon = document.getElementById("freeShipping");
    const gift1Icon = document.getElementById("gift1");
    const gift2Icon = document.getElementById("gift2");
  
    if (subtotalPrice < tiers[0]) {
      hintContainer.innerHTML = `You are $${this.roundPrice(
        tiers[0] - subtotalPrice
      )} away from <strong>FREE SHIPPING</strong>`;
      barContainer.style = `width: ${this.roundPrice(
        (subtotalPrice / tiers[2]) * 100
      )}%`;
      freeShippingIcon.querySelector(".upsell__cart-icon").classList.remove("active");
      gift1Icon.querySelector(".upsell__cart-icon").classList.remove("active");
      gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
    }
    if (subtotalPrice >= tiers[0]) {
      hintContainer.innerHTML = `Add $${this.roundPrice(
        tiers[1] - subtotalPrice
      )} to unlock a free Mystery Gift!`;
      barContainer.style = `width: ${this.roundPrice(
        (subtotalPrice / tiers[2]) * 100
      )}%`;
      freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
      gift1Icon.querySelector(".upsell__cart-icon").classList.remove("active");
      gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
    }
    if (subtotalPrice >= tiers[1]) {
      hintContainer.innerHTML = `Add $${this.roundPrice(
        tiers[2] - subtotalPrice
      )} to unlock a one more Mystery Gift!`;
      barContainer.style = `width: ${this.roundPrice(
        (subtotalPrice / tiers[2]) * 100
      )}%`;
      freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
      gift1Icon.querySelector(".upsell__cart-icon").classList.add("active");
      gift2Icon.querySelector(".upsell__cart-icon").classList.remove("active");
    }
    if (subtotalPrice >= tiers[2]) {
      hintContainer.innerHTML = `You've unlocked a Free Mystery Gift!`;
      barContainer.style = `width: 100%`;
      freeShippingIcon.querySelector(".upsell__cart-icon").classList.add("active");
      gift1Icon.querySelector(".upsell__cart-icon").classList.add("active");
      gift2Icon.querySelector(".upsell__cart-icon").classList.add("active");
    }
  }
  
  roundPrice(num) {
    return num.toFixed(2);
  }
  
}
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