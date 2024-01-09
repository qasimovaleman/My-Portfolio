const products = document.querySelector(".products");
const BASE_URL = `http://localhost:8080`;
const favCount = document.querySelector(".fav-count");
//
//
const favoritedProducts = getFavoritesFromLocaleStorage();

calculateFavCount(favoritedProducts.length);

async function getData() {
  const response = await axios(`${BASE_URL}/cards`);
  console.log(response.data);
  drawCards(response.data);
}
getData("myCard");
/////////

function drawCards(data) {
  products.innerHTML = "";

  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    const productTitleElement = document.createElement("h3");
    productTitleElement.className = "product-card-title";
    productTitleElement.textContent = element.title;
    const productDescriptionElement = document.createElement("p");
    productDescriptionElement.className = "product-description";
    productDescriptionElement.textContent = element.description;
    const favIconElement = document.createElement("i");

    const favoritObj = favoritedProducts.find((item) => item.id === element.id);

    favIconElement.className = favoritObj
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    const productImageElement = document.createElement("img");

    productImageElement.src = element.imageUrl;

    favIconElement.addEventListener("click", function () {
      this.className === "fa-regular fa-heart"
        ? (this.className = "fa-solid fa-heart")
        : (this.className = "fa-regular fa-heart");

      let favorites = getFavoritesFromLocaleStorage();

      const favIndex = favorites.findIndex((item) => item.id === element.id);

      if (favIndex === -1) {
        favorites.push(element);
      } else {
        favorites.splice(favIndex, 1);
      }

      setProductToLocaleStorage(favorites);

      calculateFavCount(favorites.length);
    });

    //productTitleDivElement.append(favIconElement);

    productCardElement.append(
      favIconElement,
      productImageElement,
      productTitleElement,
      productDescriptionElement
    );

    products.append(productCardElement);
  });
}
///////////
function setProductToLocaleStorage(products) {
  localStorage.setItem("favs", JSON.stringify(products));
}

function getFavoritesFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}

function calculateFavCount(count) {
  favCount.textContent = count;
}
//
