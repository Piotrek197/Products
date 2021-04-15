const productsCon = document.querySelector("#products");
const checkboxes = document.querySelectorAll(".checkbox");
const deleteButton = document.getElementById("delete-button");

let checked = [];

const handleChange = (e) => {
  if (e.currentTarget.checked) {
    checked.push(e.target.id);
  } else {
    checked.splice(
      checked.findIndex((id) => id === e.target.id),
      1
    );
  }
  //console.log(checked);
};

deleteButton.addEventListener("click", () => {
  fetch("http://www.piotrokroj-test.freeko.pl/deleteProducts.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ids: checked,
    }),
  }).then(() => {
    displayProducts();
  });
});

const displayProducts = async () => {
  const res = await fetch(
    "http://www.piotrokroj-test.freeko.pl/grabProducts.php"
  );
  const products = await res.json();

  let htmlString = "";
  if (products === null) productsCon.innerHTML = "";

  products.forEach((product) => {
    let size;
    switch (product.unit_type) {
      case "mb":
        size = product.size_mb + " MB";
        break;
      case "dimension":
        size = product.height + "x" + product.width + "x" + product.length;
        break;
      case "weight":
        size = product.weight;
        break;
    }
    htmlString += `
      <div class="single-product">
      <input type="checkbox" id="${product.id}" class="checkbox" onchange="handleChange(event)">
      <div class="product-info">
          ${product.SKU}<br>
          ${product.name}<br>
          ${product.price} $<br>
          Size: ${size}
      </div>
  </div> 
  `;
  });
  productsCon.innerHTML = htmlString;
};

displayProducts();
