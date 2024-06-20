function createPerfumeCard(
  id,
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
      <div class="perfume" data-id="${id}">
            <a href="../product/product.html"><img src="${img}" class="perfumeImg"/></a>
            <img src="../image/shopping-cart.svg" class="svgCartBest" alt="cart" />
            <p class="bestInfo" id="brandName">${brandName}</p>
            <p class="bestInfo" id="perfumeName">${name}</p>
            <p class="bestInfo" id="scent">${description}</p>
            <div class="priceSoldWrapper">
              <p class="bestInfo" id="price">${price}원</p>
              <p class="bestInfo" id="priceConsumer">${priceConsumer.toLocaleString()}원</p>
              <p class="bestInfo" id="sold">- ${sold}%</p>
            </div>
          </div>
      `;
}

function setProductID(id) {
  localStorage.setItem("productID", id);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const productIds = [
      "6673ef1c3e4337532f6a734c",
      "6673ee663e4337532f6a7357",
      "6673ee663e4337532f6a7359",
      "6673ee663e4337532f6a735e",
    ]; // 불러오고 싶은 특정 상품의 ID들

    // API에서 데이터 가져오기
    const productPromises = productIds.map((id) =>
      fetch(`http://34.22.80.21/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product with ID ${id}, status: ${response.status}`
          );
        }
        return response.json();
      })
    );

    const products = await Promise.all(productPromises);

    // JSON 파일에서 데이터 가져오기
    const jsonDataResponse = await fetch("../product/product.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!jsonDataResponse.ok) {
      throw new Error(
        `Failed to fetch JSON data, status: ${jsonDataResponse.status}`
      );
    }

    const jsonData = await jsonDataResponse.json();

    // 데이터 결합
    const combinedData = products.map((product, index) => {
      const jsonItem = jsonData.find((item) => item.name === product.name);
      return {
        id: product.id,
        name: product.name,
        price: jsonItem ? jsonItem.price : 0,
        description: product.description,
        img: product.img,
        sold: product.sold,
        brandName: jsonItem ? jsonItem.brandName : "Unknown Brand",
        priceConsumer: jsonItem
          ? parseInt(jsonItem.priceConsumer.replace(/,/g, ""))
          : 0,
        point: jsonItem ? jsonItem.point : 0,
        imgInfo: jsonItem ? jsonItem.imgInfo : "../image/default.jpg",
      };
    });

    // HTML 생성
    const html = combinedData
      .map((x) =>
        createPerfumeCard(
          x.id,
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

    // 클릭 이벤트 리스너 추가
    document.querySelectorAll(".perfume a").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        const parent = element.closest(".perfume");
        const id = parent.dataset.id;
        setProductID(id);
        window.location.href = element.href;
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      "#bestSection"
    ).innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
});
