function createPerfumeCard(name, price, img, description) {
  return `
  <div class="perfume">
        <img src="../image/perfume1.jpg" class="perfumeImg" />
        <img src="../image/shopping-cart.svg" class="svgCartBest" alt="cart" />
        <p class="bestInfo" id="brandName">${name}</p>
        <p class="bestInfo" id="perfumeName">옴므 코롱</p>
        <p class="bestInfo" id="scent">${description}</p>
        <p class="bestInfo" id="price">${price.toLocaleString()}원</p>
      </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  /**
   * {
    "_id": "60c72b3a9b1d8a4a3c4d2e42",
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d491",
    "name": "Perfume B",
    "price": 65.5,
    "description": "A luxurious fragrance with woody notes.",
    "img": "perfume_b.jpg",
    "sold": 15
   */
  const products = await fetch("http://34.22.80.21/api/products/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json());

  const html = products
    .map((x) => createPerfumeCard(x.name, x.price, x.img, x.description))
    .join("");

  document.querySelector("#bestSection").innerHTML = html;
});
