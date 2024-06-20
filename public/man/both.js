function perfumeBestList(
  id,
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
    <div class="perfumeList" data-id="${id}">
      <a href="../product/product.html"><img src="${img}" class="perfumeImgList"/></a>
      <img src="../image/shopping-cart.svg" class="svgCart" alt="cart" />
      <p class="info" id="brandName">${brandName}</p>
      <p class="info" id="perfumeName">${name}</p>
      <p class="info" id="scent">${description}</p>
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
    // API에서 "Unisex" 카테고리의 데이터 가져오기
    const categoryResponse = await fetch("http://34.22.80.21/api/categories/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!categoryResponse.ok) {
      throw new Error(
        `Failed to fetch categories, status: ${categoryResponse.status}`
      );
    }

    const categories = await categoryResponse.json();
    const womenCategory = categories.find(
      (category) => category.name === "Unisex"
    );
    const womenProducts = womenCategory ? womenCategory.products : [];

    // JSON 파일에서 데이터 가져오기
    const jsonBestListResponse = await fetch("../product/product.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!jsonBestListResponse.ok) {
      throw new Error(
        `Failed to fetch JSON data, status: ${jsonBestListResponse.status}`
      );
    }

    const jsonBestList = await jsonBestListResponse.json();

    // 데이터 결합
    const combinedBestList = womenProducts
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
            imgInfo: jsonItemBestList.imgInfo,
          };
        }
      })
      .filter((item) => item !== undefined); // null/undefined 제거

    // 최대 20개의 데이터만 사용
    const limitedBestList = combinedBestList.slice(0, 20);

    // HTML 생성
    const html = limitedBestList
      .map((x) =>
        perfumeBestList(
          x.id,
          x.name,
          x.price,
          x.img,
          x.description,
          x.sold,
          x.brandName,
          x.priceConsumer,
          x.point
        )
      )
      .join("");

    document.querySelector("#perfumeBestList").innerHTML = html;

    // 클릭 이벤트 리스너 추가
    document.querySelectorAll(".perfumeList a").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        const parent = element.closest(".perfumeList");
        const id = parent.dataset.id;
        setProductID(id);
        window.location.href = element.href;
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      "#perfumeBestList"
    ).innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
});
