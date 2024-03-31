var MainImg = document.getElementById("MainImg");
var smalling = document.getElementsByClassName("small-img");

smalling[0].onclick = function () {
  MainImg.src = smalling[0].src;
};
smalling[1].onclick = function () {
  MainImg.src = smalling[1].src;
};
smalling[2].onclick = function () {
  MainImg.src = smalling[2].src;
};
smalling[3].onclick = function () {
  MainImg.src = smalling[3].src;
};

function handleBookNowClick() {
  var priceElement = document.querySelector(".single-pro-details h2");
  var price = priceElement.textContent.trim();
  price = price.split(" ")[1];
  var priceNumeric = parseFloat(price.replace(/[^0-9.-]+/g, ""));

  sessionStorage.setItem("price", priceNumeric);

  // window.location.href = 'cart.html';
}

function updateCartTotal() {
  var storedPrice = sessionStorage.getItem("price");

  if (storedPrice) {
    var priceNumeric = parseFloat(storedPrice);

    var priceElements = document.querySelectorAll(".price");
    priceElements.forEach(function (element) {
      element.textContent = "Rs." + priceNumeric.toFixed(2);
    });

    var totalValueElement = document.querySelector("#subtotal td:nth-child(2)");
    var totalValue = priceNumeric;
    totalValueElement.textContent = "Rs." + totalValue.toFixed(2);
  }
}

if (window.location.href.includes("cart.html")) {
  updateCartTotal();
}
