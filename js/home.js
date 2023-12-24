(function insertProds() {
  document.querySelector("#productsHolder").innerHTML =
    "<p class='loading'>loading...</p>";
  setTimeout(() => {
    document.querySelector("#productsHolder").innerHTML = "";
    allProds.map(
      (prod) =>
        (document.querySelector("#productsHolder").innerHTML += `
        <div class="product-box">
            <div class="product-category">
                <p>${prod.category}</p>
            </div>
            <div class="product-img">
                <img src=${prod.image} alt=${prod.title} />
            </div>
            <div class="prod-title">
                <h3>${prod.title}</h3>
            </div>
            <div class="product-price flex align-center justify-center">
                <p>price: <span class="product-price-number">$${prod.price}</span></p>
            </div>
            <div class="product-box-ctrl flex align-center space-between">
                <button class="btn dark-bnt w-fit" style="width: fit-content;" id="moreDetails"  data-prod=${prod.id}>more details</button>
                <button class="btn w-fit" style="width: fit-content;" id="addToCart" data-prod=${prod.id}>add to cart</button>
            </div>
        </div>`)
    );
  }, 1500);
})();

