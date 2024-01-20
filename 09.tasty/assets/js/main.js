const productCradLists = document.querySelector(".productCradLists");
//
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
const BASE_URL = `http://localhost:8080`;
let arr;
let products = null;
let productsCoppy = null;
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawCards(response.data);
  arr = response.data;
  products = response.data;
  productsCoppy = structuredClone(products);
}
getData("tastycard");
///
function drawCards(data) {
  productCradLists.innerHTML = "";
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    //
    const productImageDivElement = document.createElement("div");
    productImageDivElement.className = "product-image-parent";
    //
    const productImageElement = document.createElement("img");
    productImageElement.className = "product-image";
    productImageElement.src = element.imageUrl;
    ///
    productImageDivElement.append(productImageElement);
    /////////////////
    const productInfoElement = document.createElement("div");
    productInfoElement.className = "product-info";
    //
    const productNameElement = document.createElement("h5");
    productNameElement.className = "product-name";
    productNameElement.textContent = element.name;
    //
    const productDescriptionElement = document.createElement("p");
    productDescriptionElement.className = "product-description";
    productDescriptionElement.textContent = element.description;
    //
    productInfoElement.append(productNameElement, productDescriptionElement);
    //////////
    //
    const productPriceDivElement = document.createElement("div");
    productPriceDivElement.className = "product-price-div";
    //
    const productPriceElement = document.createElement("h4");
    productPriceElement.className = "product-price";
    productPriceElement.innerText = `$ ${element.price}`;
    //
    const productButtonElement = document.createElement("a");
    productButtonElement.className = "details-button";
    productButtonElement.innerText="VIEW"
    productButtonElement.href = `details.html?id=${element.id}`;
    productPriceDivElement.append(productPriceElement,productButtonElement);

    productCardElement.append(
      productImageDivElement,
      productInfoElement,
      productPriceDivElement
    );
    //////////////////////
    productCradLists.append(productCardElement);
  });
}
///
search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered;
  filtered = arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawCards(filtered);
});
/////////

///////////////
sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = products.sort((a, b) => a.name.localeCompare(b.name));
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = products.sort((a, b) => b.name.localeCompare(a.name));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = productsCoppy;
  }
  drawCards(sorted);
});
