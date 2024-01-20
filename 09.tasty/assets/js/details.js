let id = new URLSearchParams(window.location.search).get("id");

console.log(id);
//
const details = document.querySelector(".details");
const BASE_URL = `http://localhost:8080`;

//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}/${id}`);
  console.log(response.data);
  drawCard(response.data);
}
getData("tastycard");
//
function drawCard(element) {
  details.innerHTML = "";

  details.innerHTML += `
        <div class="product-card">
        <div>
          <img src="${element.imageUrl}" alt="" class="product-image" />
        </div>
        <div>
          <h5 class="product-name">${element.name}</h5>
          <p class="product-description">${element.description}</p>
        </div>
        <div>
          <h4 class="product-price">"$"${element.price}</h4>
        </div>
      </div>
        `;
}
