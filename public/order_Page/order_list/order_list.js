const cancelBtn = document.querySelectorAll(".cancel-btn");

async function onCancelButtonClick(e) {
  const check = confirm("정말 주문을 취소하시겠습니까?");

  if (!check) {
    return;
  }

  const orderId = e.target.getAttribute("attr-order-id");

  const result = await fetch(
    `http://34.22.80.21/api/orders/orders?oid=${orderId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  ).then((x) => x.json());

  alert("삭제되었습니다.");
}

cancelBtn.forEach((el) => {
  el.addEventListener("click", onCancelButtonClick);
});
