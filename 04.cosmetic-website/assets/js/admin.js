//
const searchInput = document.querySelector(".searchInput");
const tBody = document.querySelector("tbody");
const sort = document.querySelector(".sort");
const BASE_URL = `http://localhost:8080`;
let arr;

//
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawTable(response.data);
  arr = response.data;
}
getData("products");
//
function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `

    <td>${element.id}</td>
    <td><img src="${element.imageUrl}" alt="" class="tableImage"></td>
    <td>${element.description}</td>
    <td>${element.name}</td>
    <td>${element.price}</td>
    <td> <a href="./admin-form.html?id=${element.id}"class="btn btn-success">EDIT</a> </td>
    <td> <button class="btn btn-danger" onclick=deleteSupplier(${element.id},this)>DELETE</button> </td>
`;
    tBody.append(trElement);
  });
}
//
async function deleteSupplier(id, btn) {
  console.log(id);
  if (confirm("you want to delete?")) {
    btn.closest("tr").remove();
    await axios.delete(`${BASE_URL}/products/${id}`);
  }
}
//
searchInput.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
//
