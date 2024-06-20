document.addEventListener("DOMContentLoaded", loadOrderList());
const cancelBtn = document.querySelectorAll(".cancel-btn");

async function loadOrderList() {
  try {
    //서버에서 데이터 가져오기
    const orderTable = document.getElementById("orderTable");
    const response = await fetch(
      "http://localhost:5000/api/orders/66717406fbeacc5c007f7ddd"
    );
    const orders = await response.json();

    // 데이터를 테이블에 추가하기
    orders.forEach((order) => {
      let row = document.createElement("tr");
      row.innerHTML = `
      <td>${order.orderNumber}</td>
      <td>${order.productImage}</td>
      <td>${order.productName}</td>
      <td>${order.price}</td>
      <td>${order.quantity}</td>
      `;
      orderTable.querySelector("tbody").appendChild(row);
    });
  } catch (error) {
    console.error("주문 데이터를 가져오는 중 오류가 발생했습니다.", error);
  }
}

async () => {
  const data = await loadOrderList();
  const orderTable = document.getElementById("orderTable");
};

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
