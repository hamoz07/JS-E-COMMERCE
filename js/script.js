let allProds = productsDB || [];

const helloUser = document.querySelector("#user p");
const helloUserName = document.querySelector("#user p span");
const userList = document.querySelector("#userList");
const loginUser = document.querySelector("#loginUser");
const logout = document.querySelector("#logout");
const shoppingCartLink = document.querySelector(".shoppingCartLink");
const shoppingCartList = document.querySelector("#shoppingCartList");
const loader = document.querySelector("#loader");
let table = document.querySelector("#ordersTable");
let productPriceNum = document.querySelector("#productPriceNum");

// if there is display him
let getUser = JSON.parse(localStorage.getItem("user"));
let usernamer = (getUser = getUser?.username.split(" ")[0]);

if (usernamer) {
  loginUser.classList.add("hidden");
  helloUser.classList.add("show");
  helloUserName.textContent = `${usernamer}`;
}

// removing and adding classes
document.addEventListener("click", (e) => {
  if (e.target.id === "helloUser" || e.target.id === "username") {
    userList.classList.toggle("active");
    shoppingCartList.classList.remove("open");
  } else {
    userList.classList.remove("active");
  }

  if (e.target.id === "shoppingCart") {
    shoppingCartList.classList.toggle("open");
    userList.classList.remove("active");
    shoppingCartLink.classList.toggle("active");
  }

  if (e.target.id === "closeCart") {
    shoppingCartList.classList.remove("open");
    shoppingCartLink.classList.remove("active");
  }

  if (e.target.id === "profilePage") {
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "profile.html";
    }, 2000);
  }

  if (
    e.target.id === "homepageLister" ||
    e.target.id === "homepageLink" ||
    e.target.id === "homepage" ||
    e.target.id === "backHomeBtn"
  ) {
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "index.html";
    }, 2000);
  }

  if (e.target.id === "profilePage") {
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "profile.html";
    }, 2000);
  }
});

let total = 0;
const cartHolder = document.querySelector("#cartProductsList");
const cartItemsNumber = document.querySelector("#cartItemsNumber");
const totalPriceNumber = document.querySelector("#totalPriceNumber");
let addenTocart = JSON.parse(localStorage.getItem("cart"));
let cart = addenTocart || [];

function setCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", (e) => {
  if (e.target.id === "addToCart") {
    if (username) {
      const prodId = e.target.dataset.prod;
      const getProd = allProds.find((pr) => pr.id === +prodId);
      const checkgottenProdInLocal = addenTocart?.find(
        (pr) => pr.id === +getProd.id
      );
      if (!cart.includes(getProd) && !checkgottenProdInLocal) {
        cart.push(getProd);
        addToCart();
        getTotalPrice();
        setCart();
      } else {
        displayAlert("this product already exists in your cart", "error");
      }
    } else {
      displayAlert("please login first", "error");
    }
  }

  if (e.target.id === "deleteProductInCart") {
    const id = e.target.dataset.del;
    const theProd = allProds.find((allpr) => allpr.id === +id);

    cart = cart.filter((c) => c.id !== theProd.id);
    localStorage.removeItem("cart");
    addenTocart = JSON.parse(localStorage.getItem("cart"));
    addToCart();
    getTotalPrice();
    setCart();
    if (table) {
      insertTable();
      if (cart.length === 0) {
        table.innerHTML = "<p class='loading'>no products</p>";
      } else {
        setTimeout(() => {
          insertTable();
        }, 1000);
      }
    }
  } else if (e.target.id === "deleteProduct") {
    const id = e.target.dataset.del;
    const theProd = allProds.find((allpr) => allpr.id === +id);

    cart = cart.filter((c) => c.id !== theProd.id);
    localStorage.removeItem("cart");
    addenTocart = JSON.parse(localStorage.getItem("cart"));
    addToCart();
    getTotalPrice();
    setCart();
    if (table) {
      insertTable();
      if (cart.length === 0) {
        table.innerHTML = "<p class='loading'>no products</p>";
      } else {
        setTimeout(() => {
          insertTable();
        }, 1000);
      }
    }
  }

  if (e.target.id === "moreDetails") {
    const id = e.target.dataset.prod;
    const theProd = allProds.find((allpr) => allpr.id === +id);
    localStorage.setItem("cart_product",JSON.stringify(theProd))
    loader.classList.add("start")
    setTimeout(()=>{
        window.location = "productDetails.html"
    },1000)
}
});

function addToCart() {
  cartItemsNumber.innerHTML = cart.length;
  if (cart.length === 0) {
    cartHolder.innerHTML = `
      <p class="no-products">no products</p>
    `;
  } else {
    shoppingCartList.classList.add("open");
    userList.classList.remove("active");
    shoppingCartLink.classList.add("active");
    cartHolder.innerHTML = "";
    cart.map(
      (p) =>
        (cartHolder.innerHTML += `
    <div class="cart-product-box flex space-between">
                    <div class="product-details flex align-center">
                        <div class="img">
                            <img src=${p.image} alt=${p.title} />
                        </div>
                        <div class="title">
                            <p>${p.title}</p>
                            <div class="quantity">
                                <p>quantity: <span class="qyt number">${p.qyt}</span></p>
                                <div class="qyt-btn flex align-center">
                                    <button class="btn increase" id="increase" onClick="increaseQty(${p.id})">+</button><button class="btn decrease"
                                        id="decrease" onClick="decreaseQty(${p.id})">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="price flex align-center space-between">
                        <p class="price-number">$${p.price}</p>
                        <i class="fas fa-trash delete-product" id="deleteProductInCart" data-del=${p.id}></i>
                    </div>
    </div>
    `)
    );
  }
}

function increaseQty(itemId) {
  const cartItem = cart.find((c) => c.id === itemId);
  if (cartItem) {
    cartItem.qyt += 1;
  }
  setCart();
  getTotalPrice();

  addToCart();
}

function decreaseQty(itemId) {
  const cartItem = cart.find((c) => c.id === itemId);
  if (cartItem && cartItem.qyt > 1) {
    cartItem.qyt -= 1;
  }
  setCart();
  getTotalPrice();

  addToCart();
}

function getTotalPrice() {
  total = 0;
  cart.forEach((c) => {
    total += c.price * c.qyt;
  });
  totalPriceNumber.innerHTML = `$${total}`;
  if (table) {
    productPriceNum.innerHTML = `$${total}`;
  }
}

if (addenTocart) {
  addToCart();
  getTotalPrice();
}

//! ==========================================================================================

function insertTable() {
  productPriceNum.innerHTML = `$${total}`;
  table.innerHTML = "";
  table.innerHTML = `
  <thead>
  <th>image</th>
  <th>title</th>
  <th>price</th>
</thead>
  `;

  cart.map((c) => {
    table.innerHTML += `
    <tbody>
    <tr>
        <td>
            <div class="img"><img src=${c.image} alt=""></div>
        </td>
        <td>
            <p>${c.title}</p>
        </td>
        <td>
            $${c.price}
        </td>
        <td class="delete"><i class="fas fa-trash" id="deleteProduct" data-del=${c.id}></i></td>
    </tr>
</tbody>
    `;
  });
}
