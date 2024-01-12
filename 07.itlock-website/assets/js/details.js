const id = new URLSearchParams(window.location.search).get("id");
const details = document.querySelector(".details");
//
const BASE_URL = `http://localhost:8080/itCard`;
////
async function getData() {
  try {
    const response = await axios(`${BASE_URL}/${id}`);
    console.log(response.data);
    products = response.data;
    drawProductCards(response.data);
  } catch (error) {
    console.log(error);
  }
}
getData();
///////////////////
function drawProductCards(data) {
  details.innerHTML = "";
  ///////
  details.innerHTML += `
      <div class="productCard">
      <div>
      <img
        src="${data.imageUrl}"
        alt=""
        class="product-image"
      />
    </div>
    <h5 class="card-title">${data.title}</h5>
    <span class="card-description"
      >${data.description}</span
    ></div>
      `;
}

//////////////////
