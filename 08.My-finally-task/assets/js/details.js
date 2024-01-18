let id = new URLSearchParams(window.location.search).get("id");
console.log(id);
//
const details = document.querySelector(".details");
const BASE_URL = `http://localhost:8080`;
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}/${id}`);
  console.log(response.data);
  drawCard(response.data)
}
getData("cosmetics");
/////////
function drawCard(element){
    details.innerHTML=""
    details.innerHTML +=`
    <div class="product-card">
    <img src="${element.imageUrl}" alt="" class="product-image"/>
    <h5 class="product-name">${element.name}</h5>
    <p class="product-price">"Price:$" ${element.price}</p>
    <span class="product-description">${element.description}</span>
  </div>
    `
}