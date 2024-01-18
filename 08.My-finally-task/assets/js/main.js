const productCardLists = document.querySelector(".productCardLists");
//
const search = document.querySelector(".search");
let arr;
//
const sort = document.querySelector(".sort");
let products = null;
let productsCoppy = null;
const BASE_URL = `http://localhost:8080`;
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawCards(response.data);
  //
  arr = response.data;
  //
  products = response.data;
  productsCoppy = structuredClone(products);
}
getData("cosmetics");
///
function drawCards(data) {
  productCardLists.innerHTML = "";
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    //
    const productImageElement = document.createElement("img");
    productImageElement.className = "product-image";
    productImageElement.src = element.imageUrl;
    //
    const productNameElement = document.createElement("h5");
    productNameElement.className = "product-name";
    productNameElement.innerText = element.name;
    //
    const productPriceElement = document.createElement("p");
    productPriceElement.className = "product-price";
    productPriceElement.innerText = `price:$ ${element.price}`;
    //
    const productDetailsButtonElement = document.createElement("a");
    productDetailsButtonElement.className = "productButton";
    productDetailsButtonElement.href = `details.html?id=${element.id}`;
    productDetailsButtonElement.textContent = "VIEW";
    ///////////////////////////
    productCardElement.append(
      productImageElement,
      productNameElement,
      productPriceElement,
      productDetailsButtonElement
    );
    productCardLists.append(productCardElement);
  });
}
//---------SEARCH----------------
search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered;
  filtered = arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  console.log(filtered);
  drawCards(filtered);
});
//---------SORT------------------
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
