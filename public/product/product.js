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
    const combinedBestList = productsBestList.products
      .map((apiProduct) => {
        const jsonItemBestList = jsonBestList.find(
          (jsonProduct) => jsonProduct.name === apiProduct.name
        );

        if (jsonItemBestList) {
          return {
            id: apiProduct.id,
            name: apiProduct.name,
            price: jsonItemBestList.price,
            description: apiProduct.description,
            img: apiProduct.img,
            sold: apiProduct.sold,
            brandName: jsonItemBestList.brandName,
            priceConsumer: jsonItemBestList.priceConsumer,
            point: jsonItemBestList.point,
            pointRate: jsonBestList.pointRate,
            imgInfo: jsonItemBestList.imgInfo,
          };
        }
      })
      .filter((item) => item !== undefined); // null/undefined 제거

    // 로컬 저장소에서 제품 ID 가져오기
    const productID = localStorage.getItem("productID");
    const product = combinedBestList.find((item) => item.id == productID);

    if (product) {
      // HTML 생성
      const html = perfumeInfo(
        product.name,
        product.price,
        product.img,
        product.description,
        product.sold,
        product.brandName,
        product.priceConsumer,
        product.point,
        product.pointRate
      );

      document.querySelector(".productSection").innerHTML =
        html + document.querySelector(".productSection").innerHTML;

      // 이미지 정보 설정
      document.querySelector(".imgInfoSection img").src = product.imgInfo;
    } else {
      document.querySelector(
        ".productSection"
      ).innerHTML = `<p>Error: Product not found</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      ".productSection"
    ).innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
});

function perfumeInfo(
  name,
  price,
  img,
  description,
  sold,
  brandName,
  priceConsumer,
  point,
  pointRate
) {
  return `
    <img src="${img}" class="perfumeImg" alt="Perfume Image" />
    <div class="productInfo">
      <div class="productNames">
        <p>${brandName}</p>
        <p>${name}</p>
      </div>
      <div class="productPricing">
        <div class="pricingTitles">
          <p>소비자가</p>
          <p>정품보증가</p>
          <p>적립포인트</p>
          <p>구매후기</p>
        </div>
        <div class="pricingValues">
          <p>${priceConsumer.toLocaleString()}원</p>
          <div>
            <p class="price">${price.toLocaleString()}원</p>
            <p class="sold">-${sold}%</p>
          </div>
        <div>
            <p class="point">${point.toLocaleString()}원</p>
            <p class="rate">(2%)</p>
          </div>
          <p class="star">⭐ 4.8</p>
        </div>
      </div>
  `;
}
