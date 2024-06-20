const cancelBtn = document.querySelectorAll(".cancel-btn");

const list = fetch(
  "http://localhost:5000/api/orders/66717406fbeacc5c007f7ddd",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
).then((x) => x.json());

async function onCancelButtonClick(e) {
  const check = confirm("정말 주문을 취소하시겠습니까?");

  if (check == true) {
    const orderId = e.target.getAttribute("attr-order-id");

    const result = await fetch(
      `http://34.22.80.21/api/orders/orders?oid=${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    ).then((x) => x.json());

    window.location.href = "/public/order_Page/order_exchange/refund.html";
  }
}
cancelBtn.forEach((el) => {
  el.addEventListener("click", onCancelButtonClick);
});
