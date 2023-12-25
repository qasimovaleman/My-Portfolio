//
const id = new URLSearchParams(window.location.search).get("id");

const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
//
const BASE_URL = `http://localhost:8080/products`;
//
if (id) {
  axios(`${BASE_URL}/${id}`).then((res) => {
    allInputs[1].value = res.data.description;
    allInputs[2].value = res.data.name;
    allInputs[3].value = res.data.price;
  });
}
//
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let Obj = {
    description: allInputs[1].value,
    name: allInputs[2].value,
    price: allInputs[3].value,
    imageUrl: `./assets/images/${allInputs[0].value.split("\\")[2]}`,
  };
  console.log(allInputs[0].value);
  if (id) {
    axios.patch(`${BASE_URL}/${id}`, Obj);
  } else {
    axios.post(`${BASE_URL}`, Obj);
  }
  window.location = "./admin.html";
});
