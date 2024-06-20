function perfumeBestList(
  name,
  price,
  img,
  description,
  sold,
  brandName,
  priceConsumer,
  point
) {
  return `
      <div class="perfumeList">
        <img src="${img}" class="perfumeImgList" />
        <img src="../image/shopping-cart.svg" class="svgCart" alt="cart" />
        <p class="info" id="brandName">${brandName}</p>
        <p class="info" id="perfumeName">${name}</p>
        <p class="info" id="scent">${description}</p>
        <p class="info" id="price">${price}</p>
        <p class="bestInfo" id="sold">- ${sold}%</p>
      </div>
      `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // API에서 데이터 가져오기
    const productsBestList = await fetch("http://34.22.80.21/api/products/", {
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
    const jsonBestList = await fetch("../product/product.json", {
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
    const combinedBestList = productsBestList.map((product, index) => {
      const jsonItemBestList = jsonBestList[index];
      return {
        name: jsonItemBestList.name,
        price: jsonItemBestList.price,
        description: jsonItemBestList.description,
        img: jsonItemBestList.img,
        sold: jsonItemBestList.sold,
        brandName: jsonItemBestList.brandName,
        priceConsumer: jsonItemBestList.priceConsumer,
        point: jsonItemBestList.point,
        imgInfo: jsonItemBestList.imgInfo,
      };
    });

    // HTML 생성
    const html = combinedBestList
      .map((x) =>
        perfumeBestList(
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

    document.querySelector("#perfumeBestList").innerHTML = html;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      "#perfumeBestList"
    ).innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
});
