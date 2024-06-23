document.addEventListener("DOMContentLoaded", () => {
  let isAllSelected = false;

  function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartPerfumeContainer = document.querySelector(".cartPerfume");
    const paymentValues = document.querySelector(".payment-values");

    // 현재 체크된 상태를 저장
    const currentCheckedStates = Array.from(
      document.querySelectorAll(".cartItem .checkbox")
    ).map((checkbox) => checkbox.checked);

    cartPerfumeContainer.innerHTML = "";
    cartItems.forEach((item, index) => {
      const totalPrice = item.price * item.quantity;

      const cartItemHTML = `
          <div class="cartItem" data-index="${index}">
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
              <p>${totalPrice.toLocaleString()}원</p>
            </div>
          </div>
        `;
      cartPerfumeContainer.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    // 기존 체크 상태를 복원
    document
      .querySelectorAll(".cartItem .checkbox")
      .forEach((checkbox, index) => {
        checkbox.checked = currentCheckedStates[index] || false;
      });

    updatePaymentValues();
  }

  function updatePaymentValues() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const checkedItems = document.querySelectorAll(
      ".cartItem .checkbox:checked"
    );
    let totalProductPrice = 0;
    let totalDiscountPrice = 0;

    checkedItems.forEach((checkbox) => {
      const cartItem = checkbox.closest(".cartItem");
      const index = cartItem.getAttribute("data-index");
      const item = cartItems[index];
      const totalPrice = item.price * item.quantity;
      totalProductPrice += totalPrice;
    });

    const totalPayment = totalProductPrice - totalDiscountPrice;
    const paymentValues = document.querySelector(".payment-values");
    paymentValues.innerHTML = `
        <p>${totalProductPrice.toLocaleString()}원</p>
        <div class="operator">-</div>
        <p>${totalDiscountPrice.toLocaleString()}원</p>
        <div class="operator">=</div>
        <p>${totalPayment.toLocaleString()}원</p>
      `;
  }

  function updateQuantity(index, delta) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems[index]) {
      cartItems[index].quantity += delta;
      if (cartItems[index].quantity < 1) cartItems[index].quantity = 1; // 최소 수량 1로 설정
      localStorage.setItem("cart", JSON.stringify(cartItems));
      updateCartDisplay();
    }
  }

  function deleteSelectedItems() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const checkedItems = document.querySelectorAll(
      ".cartItem .checkbox:checked"
    );

    const itemsToDelete = [];
    checkedItems.forEach((checkbox) => {
      const cartItem = checkbox.closest(".cartItem");
      const index = parseInt(cartItem.getAttribute("data-index"), 10);
      itemsToDelete.push(index);
    });

    // 역순으로 삭제하여 인덱스 문제가 발생하지 않도록 처리
    itemsToDelete
      .sort((a, b) => b - a)
      .forEach((index) => {
        cartItems.splice(index, 1);
      });

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartDisplay();
  }

  document.querySelector(".cartPerfume").addEventListener("click", (event) => {
    if (event.target.classList.contains("plus")) {
      const cartItem = event.target.closest(".cartItem");
      const index = cartItem.getAttribute("data-index");
      updateQuantity(parseInt(index), 1);
    } else if (event.target.classList.contains("minus")) {
      const cartItem = event.target.closest(".cartItem");
      const index = cartItem.getAttribute("data-index");
      updateQuantity(parseInt(index), -1);
    }
  });

  document.querySelector(".cartPerfume").addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox")) {
      updatePaymentValues();
    }
  });

  document
    .querySelector(".sortCart a:nth-child(1)")
    .addEventListener("click", (event) => {
      event.preventDefault();
      const checkboxes = document.querySelectorAll(".cartItem .checkbox");
      isAllSelected = !isAllSelected;
      checkboxes.forEach((checkbox) => (checkbox.checked = isAllSelected));
      updatePaymentValues();
    });

  document
    .querySelector(".sortCart a:nth-child(2)")
    .addEventListener("click", (event) => {
      event.preventDefault();
      deleteSelectedItems();
    });

  updateCartDisplay();
});
