const option = document.getElementById("switcher");
const types = document.querySelectorAll("[data-type]");

const SKU = document.getElementById("sku");
const productname = document.getElementById("name");
const price = document.getElementById("price");
const type = document.getElementById("switcher");
const size_mb = document.getElementById("size-mb");
const height = document.getElementById("height-cm");
const width = document.getElementById("width-cm");
const length = document.getElementById("length-cm");
const weight = document.getElementById("weight-kg");

const message = document.getElementById("error-message");

//Toggle unit form
option.addEventListener("change", (e) => {
  types.forEach((type) => {
    if (type.dataset.type === e.target.value) {
      type.classList.contains("not-visible") &&
        type.classList.remove("not-visible");
    } else {
      type.classList.add("not-visible");
    }
  });
});

const checkForm = () => {
  const regNum = new RegExp("^[0-9]+$");

  if (!regNum.test(price.value)) return false;
  switch (type.value) {
    case "mb":
      if (!regNum.test(size_mb.value)) return false;
      break;
    case "dimension":
      if (
        !regNum.test(height.value) ||
        !regNum.test(width.value) ||
        !regNum.test(length.value)
      )
        return false;
      break;
    case "weight":
      if (!regNum.test(weight.value)) return false;
      break;
  }
  return true;
};
const handleSave = () => {
  if (checkForm()) {
    fetch("http://www.piotrokroj-test.freeko.pl/add.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        SKU: SKU.value,
        productname: productname.value,
        price: price.value,
        type: type.value,
        size_mb: size_mb.value,
        height: height.value ? height.value : "",
        width: width.value ? width.value : "",
        length: length.value ? length.value : "",
        weight: weight.value ? weight.value : "",
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        window.location.replace("index.html");
      });
  } else {
    message.innerHTML =
      "<p style='color:white; border: 2px #ff5c62 solid; border-radius:3px; background-color:#ff5c62; padding:0.5em'>Please provide data of indicated type. All fields are mandatory.</p>";
  }
};
