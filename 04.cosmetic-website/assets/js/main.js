//
const favCount = document.querySelector(".fav-count");
const products = document.querySelector(".products");
const BASE_URL = `http://localhost:8080`;
//
let productsCopy = [];
let limit = 3;
const loadMore = document.querySelector(".loadMore");
//
const favoritedProducts = getFavoritesFromLocalStorages();
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  productsCopy = response.data;
  drawCards(response.data.slice(0, limit));
}
getData("products");
//
function drawCards(data) {
  products.innerHTML = "";
  data.forEach((element) => {
    let cardDivElement = document.createElement("div");
    cardDivElement.classList = "card-Div";
    //
    let cardImgElement = document.createElement("img");
    cardImgElement.classList = "cardImage";
    cardImgElement.src = element.imageUrl;
    //
    let cardNameElement = document.createElement("p");
    cardNameElement.classList = "cardName";
    cardNameElement.innerHTML = element.name;
    //
    let cardPriceElement = document.createElement("span");
    cardPriceElement.classList = "cardPrice";
    cardPriceElement.innerHTML = `Price:$${element.price}`;
    //
    let cardTitleElement = document.createElement("div");
    cardTitleElement.classList = "cardTitle";
    //
    let buttonElement = document.createElement("button");
    buttonElement.classList = "addToBag";
    buttonElement.innerText = "Add To Bag";
    //
    let titleLeftDivElement = document.createElement("div");
    titleLeftDivElement.classList = "titleLeft";
    //
    let favIconElement = document.createElement("i");
    favIconElement.classList = "heartIcon";
    //
    const favoritObj = favoritedProducts.find((item) => item.id === element.id);

    favIconElement.className = favoritObj
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    favIconElement.addEventListener("click", function () {
      this.className === "fa-regular fa-heart"
        ? (this.className = "fa-solid fa-heart")
        : (this.className = "fa-regular fa-heart");
      let favorites = getFavoritesFromLocalStorages();
      const favIndex = favorites.favIndex((item) => item.id === element.id);
      if (favIndex === -1) {
        favorites.push(element);
      } else {
        favorites.splice(favIndex, 1);
      }
      setProductsToLocalStorages(favorites);
      calculateFavCount(favorites.length);
    });
    cardTitleElement.append(favIconElement);
    cardDivElement.append(
      cardTitleElement,
      cardImgElement,
      cardNameElement,
      cardPriceElement,
      //cardTitleElement,
      buttonElement
    );
    products.append(cardDivElement);
  });
}
//
function setProductsToLocalStorages(products) {
  localStorage.setItem("favs", JSON.stringify(products));
}
//
function getFavoritesFromLocalStorages() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}
//
function calculateFavCount(count) {
  favCount.textContent = count;
}
//
loadMore.addEventListener("click", function () {
  limit += 3;
  drawCards(productsCopy.slice(0, limit));
  if (limit >= productsCopy.length) {
    this.remove();
  }
});
