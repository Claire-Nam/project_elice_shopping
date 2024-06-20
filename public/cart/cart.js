document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  if (cartItems && cartItems.length > 0) {
    const html = cartItems
      .map((item) => {
        return `
          <div class="cartItem">
            <input type="checkbox" class="checkbox" />
            <img src="${item.img}" class="perfumeImg" />
            <div class="cartList">
              <p class="cartInfo brandName">${item.brandName}</p>
              <p class="cartInfo perfumeName">${item.name}</p>
              <p class="cartInfo price">${item.price.toLocaleString()}원</p>
            </div>
            <div class="count">
              <button class="minus">-</button>
              <p>${item.quantity}</p>
              <button class="plus">+</button>
            </div>
            <div class="cartPrice">
              <p>${(item.price * item.quantity).toLocaleString()}원</p>
            </div>
          </div>
        `;
      })
      .join("");

    document.getElementById("cartItems").innerHTML = html;

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discountedPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity * (item.sold / 100),
      0
    );
    const finalPrice = totalPrice - discountedPrice;

    document.getElementById(
      "totalPrice"
    ).textContent = `${totalPrice.toLocaleString()}원`;
    document.getElementById(
      "discountedPrice"
    ).textContent = `${discountedPrice.toLocaleString()}원`;
    document.getElementById(
      "finalPrice"
    ).textContent = `${finalPrice.toLocaleString()}원`;
  } else {
    document.getElementById("cartItems").innerHTML =
      "<p>장바구니에 담긴 상품이 없습니다.</p>";
  }
});
