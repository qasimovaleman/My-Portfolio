const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allinputs = document.querySelectorAll("input");
//
let editId = null;
const BASE_URL = `http://localhost:8080`;
//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawTable(response.data);
}
getData("cosmetics");
/////////////

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML += `
        
        <td>${element.id}</td>
        <td><img src="${element.imageUrl}" alt="" class="table-image"></td>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td>${element.description}</td>
        <td> <button class="delete"  onclick=deleteProduct("${element.id}",this)>DELETE</button></td>
        <td> <button class="edit" onclick=editBtn("${element.id}")>EDIT</button> </td>
        
        `;
    tBody.append(trElement);
  });
}
///
function deleteProduct(id, btn) {
  if (window.confirm("do you want to delete producct")) {
    axios.delete(`${BASE_URL}/cosmetics/${id}`);
    btn.closest(".products-card").remove();
  }
}
/////////////////////////////////
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    imageUrl: `./assets/images/${allinputs[0].value.split("\\")[2]}`,
    name: allinputs[1].value,
    price: allinputs[2].value,
    description: allinputs[3].value,
  };
  if (!editId) {
    if (
      allinputs[0].value != "" &&
      allinputs[1].value != "" &&
      allinputs[2].value != "" &&
      allinputs[3].value != ""
    ) {
      await axios.post(`${BASE_URL}/cosmetics`, obj);
    } else {
      alert("bow buraxmaq olmaz!!");
    }
  } else {
    await axios.patch(`${BASE_URL}/cosmetics/${editId}`, obj);
  }
});
///////////////
async function editBtn(id) {
  editId = id;
  const response = await axios(`${BASE_URL}/cosmetics/${id}`);
  allinputs[1].value = response.data.name;
  allinputs[2].value=response.data.price;
  allinputs[3].value=response.data.description
}
