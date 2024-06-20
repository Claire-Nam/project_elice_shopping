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
      <img src="../image/shopping-cart.svg" class="svgCart" alt="cart" onclick="addToCart('${id}', '${name}', ${price}, '${img}', '${description}', ${sold}, '${brandName}', ${priceConsumer}, ${point})"/>
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

function addToCart(
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
  const cartItem = {
    id,
    name,
    price,
    img,
    description,
    sold,
    brandName,
    priceConsumer,
    point,
    quantity: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex((item) => item.id === id);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("장바구니에 추가되었습니다.");
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
