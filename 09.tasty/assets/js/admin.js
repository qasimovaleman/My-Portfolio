const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
let editid = null;

//
const BASE_URL = `http://localhost:8080`;
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawTable(response.data);
}
//
getData("tastycard");
function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
        <td>${element.id}</td>
        <td><img src="${element.imageUrl}" alt="" class="table-image"></td>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td> <button onclick=editBtn("${element.id}") class="btn btn-success" >EDIT</button> </td>
        <td><button onclick=deleteProduct("${element.id}",this) class="btn btn-danger" >DELETE</button></td>
       `;
    tBody.append(trElement);
  });
}
//////////////////
function deleteProduct(id, btn) {
  if (window.confirm("do you want to delete product?")) {
    axios.delete(`${BASE_URL}/tastycard/${id}`);
    btn.closest(".product-card").remove();
  }
}
///////////////////
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    imageUrl: `./assets/images/${allInputs[0].value.split("\\")[2]}`,
    name: allInputs[1].value,
    description: allInputs[2].value,
    price: allInputs[3].value,
  };
  if (!editid) {
    if (
      allInputs[0].value != "" &&
      allInputs[1].value != "" &&
      allInputs[2].value != "" &&
      allInputs[3].value != ""
    ) {
      await axios.post(`${BASE_URL}/tastycard`, obj);
    } else {
      alert("bow buraxmaq olmaz");
    }
  } else {
    await axios.patch(`${BASE_URL}/tastycard/${editid}`, obj);
  }
});
async function editBtn(id) {
  editid = id;
  const response = await axios(`${BASE_URL}/tastycard/${id}`);
  allInputs[1].value = response.data.name;
  allInputs[2].value = response.data.description;
  allInputs[3].value = response.data.price;
}
