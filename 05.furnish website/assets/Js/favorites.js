const products = document.querySelector(".products");
const BASE_URL = `http://localhost:8080`;
//

const favoritedProducts = getFavoritesFromLocaleStorage();

drawCards(favoritedProducts);
function drawCards(data) {
  products.innerHTML = "";

  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    const productTitleElement = document.createElement("div");
    productTitleElement.className = "product-card-title";

    const productDescriptionElement = document.createElement("h3");
    productDescriptionElement.textContent = element.name;
    const favIconElement = document.createElement("i");

    const favoritObj = favoritedProducts.find((item) => item.id === element.id);

    favIconElement.className = "fa-solid fa-heart";

    const productImageElement = document.createElement("img");

    productImageElement.src = element.imageUrl;

    favIconElement.addEventListener("click", function () {
      let favorits = getFavoritesFromLocaleStorage();

      let filtered = favorits.filter((item) => item.id !== element.id);

      setProductToLocaleStorage(filtered);
      productCardElement.remove();
    });

   

    productCardElement.append(
      favIconElement,
      productImageElement,
      productTitleElement,

      productDescriptionElement
    );

    products.append(productCardElement);
  });
}

function setProductToLocaleStorage(products) {
  localStorage.setItem("favs", JSON.stringify(products));
}

function getFavoritesFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}
