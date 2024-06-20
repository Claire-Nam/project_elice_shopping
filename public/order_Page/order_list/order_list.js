document.addEventListener("DOMContentLoaded", loadOrderList());
const cancelBtn = document.querySelectorAll(".cancel-btn");

async function loadOrderList(orderId) {
  //서버에서 데이터 가져오기
  const response = await fetch(
    `http://34.22.80.21/api/orders/orders?oid=${oderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  const orders = await response.json();
  return orders;
}

(async () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("oid") || "";
  const orderItemList = document.querySelector(
    'tbody[data-id="orderTable-items"]'
  );

  const data = await loadOrderList(orderId);

  const rows = data.productList
    .map((product) => {
      return `
      <tr>
        <td>${orderId}</td>
        <td>
        <img
          src="${product.img}"
          style="width: 75px; height: 50px"
        />
        </td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.sold}</td>
        <td>${deliveryStatus}</td>
      </tr>      
    `;
    })
    .join("");
  orderItemList.innerHTML = rows;
})();

async function onCancelButtonClick(e) {
  const check = confirm("정말 주문을 취소하시겠습니까?");

  if (check == true) {
    const orderId = e.target.getAttribute("attr-order-id");

    try {
      const result = await fetch(
        `http://34.22.80.21/api/orders/orders?oid=${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        alert("주문을 성공적으로 취소했습니다.");
        window.location.href = "/public/order_Page/order_exchange/refund.html";
      } else {
        console.error("주문 취소에 실패했습니다.");
      }
    } catch (error) {
      console.error(
        "주문 취소 요청을 처리하는 동안 에러가 발생했습니다",
        error
      );
    }
  }
}

cancelBtn.forEach((el) => {
  el.addEventListener("click", onCancelButtonClick);
});
