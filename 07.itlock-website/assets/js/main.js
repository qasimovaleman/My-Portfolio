const productsCardLists = document.querySelector(".productsLists");
//let favProducts = getFavsFromLocaleStorage();
let products = [];
let arr;
const search = document.querySelector(".search");
//
const BASE_URL = `http://localhost:8080`;
async function getData() {
  try {
    const response = await axios(`${BASE_URL}/itCard`);
    console.log(response.data);
    products = response.data;
    drawProductCards(response.data);
    arr = response.data;
  } catch (error) {
    console.log(error);
  }
}
getData();
///////////////////
function drawProductCards(data) {
  productsCardLists.innerHTML = "";
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "productCard";
    ///////
    productCardElement.innerHTML = `
    <div>
      <img
        src="${element.imageUrl}"
        alt=""
        class="product-image"
      />
    </div>
    <h5 class="card-title">${element.title}</h5>
    <span class="card-description"
      >${element.description}</span
    >
    <div class="cardButton">
      <a class="edit" href="details.html?id=${element.id}">Details</a>
      
      <button class="deleteBtn" onclick="deleteProduct(${element.id},this)">DELETE</button>
      
    </div>
 
    `;
    productsCardLists.append(productCardElement);
  });
}

//////////////////

async function deleteProduct(id) {
  console.log(id);
  try {
    if (window.confirm("you want to delete product?")) {
      axios.delete(`${BASE_URL}/itCard/${id}`);
      // btn.closest(".productsCard").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////
search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = arr.filter((item) =>
    item.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  drawProductCards(filtered);
  console.log(filtered);
});
///////////////////////////////////

////////////////////////////////
