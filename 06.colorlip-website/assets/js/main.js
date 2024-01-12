const productsCardLists = document.querySelector(".productsLists");
let products = [];
//
const BASE_URL = `http://localhost:8080`;
async function getData() {
  try {
    const response = await axios(`${BASE_URL}/greencard`);
    console.log(response.data);
    products = response.data;
    drawProductCards(response.data);
  } catch (error) {
    console.log(error);
  }
}
getData();
///////////////
function drawProductCards(data) {
  productsCardLists.innerHTML = "";
  //
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "productsCard";
    /////
    productCardElement.innerHTML = `
    <div class="mycardTop">
    <div class="mycardImagesDiv">
      <img
        src="${element.imageUrl}"
        alt="foto"
        class="mycardImages"
      />
    </div>
    <div>
      <h4 class="mycard-title">${element.title}</h4>
    </div>
  </div>
  <div class="mycardBottom">
    <p class="mycard-description">${element.description}</p>
  <div class="buttonParent">
    <a href="details.html?id=${element.id}" class="details">View Details</a>
    <button class="delete" onclick="deleteProduct(${element.id},this)">Delete</button>
  </div>
  </div>
    `;

    productsCardLists.append(productCardElement);
  });
}
///////////////////////////
function setProductToLocaleStorage(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}
///////////////////////////
function getFavsFromLocalStorage() {
  JSON.parse(localStorage.getItem("favs")) || [];
}
//////////////////////////
async function deleteProduct(id, btn) {
  //console.log(id);
  try {
    if (window.confirm("you want to delete product?")) {
      axios.delete(`${BASE_URL}/greencard/${id}`);
      btn.closest(".productsCard").remove();
    }
  } catch (error) {
    console.log(error);
  }
}








