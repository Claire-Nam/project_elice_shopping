/*function createPerfumeCard(name, price, img, description) {
  return `
    <div class="perfume">
          <img src="../image/${img}" class="perfumeImg" />
          <img src="../image/shopping-cart.svg" class="svgCartBest" alt="cart" />
          <p class="bestInfo" id="brandName">${name}</p>
          <p class="bestInfo" id="perfumeName">옴므 코롱</p>
          <p class="bestInfo" id="scent">${description}</p>
          <p class="bestInfo" id="price">${price.toLocaleString()}원</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", async () => {

  const products = await fetch("http://34.22.80.21/api/products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json());

  const html = products
    .map((x) => createPerfumeCard(x.name, x.price, x.img, x.description))
    .join("");

  document.querySelector("#bestSection").innerHTML = html;
});*/
function createPerfumeCard(
  name,
  price,
  img,
  description,
  sold,
  brandName,
  priceConsumer,
  point,
  imgInfo
) {
  return `
      <div class="perfume">
            <img src="${img}" class="perfumeImg" />
            <img src="../image/shopping-cart.svg" class="svgCartBest" alt="cart" />
            <p class="bestInfo" id="brandName">${brandName}</p>
            <p class="bestInfo" id="perfumeName">${name}</p>
            <p class="bestInfo" id="scent">${description}</p>
            <p class="bestInfo" id="price">${priceConsumer}원</p>
            <p class="bestInfo" id="sold">- ${sold}%</p>
          </div>
      `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // API에서 데이터 가져오기
    const products = await fetch("http://34.22.80.21/api/products/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    // JSON 파일에서 데이터 가져오기
    const jsonData = await fetch("../product/product.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    // 데이터 결합
    const combinedData = products.map((product, index) => {
      const jsonItem = jsonData[index];
      /*return {
        name: product.name,
        price: product.price,
        description: product.description,
        img: product.img,
        sold: product.sold,
        brandName: jsonItem.brandName,
        priceConsumer: jsonItem.priceConsumer,
        point: jsonItem.point,
        imgInfo: jsonItem.imgInfo,
      };*/
      return {
        name: jsonItem.name,
        price: jsonItem.price,
        description: jsonItem.description,
        img: jsonItem.img,
        sold: jsonItem.sold,
        brandName: jsonItem.brandName,
        priceConsumer: jsonItem.priceConsumer,
        point: jsonItem.point,
        imgInfo: jsonItem.imgInfo,
      };
    });

    // HTML 생성
    const html = combinedData
      .map((x) =>
        createPerfumeCard(
          x.name,
          x.price,
          x.img,
          x.description,
          x.sold,
          x.brandName,
          x.priceConsumer,
          x.point,
          x.imgInfo
        )
      )
      .join("");

    document.querySelector("#bestSection").innerHTML = html;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      "#bestSection"
    ).innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
});
