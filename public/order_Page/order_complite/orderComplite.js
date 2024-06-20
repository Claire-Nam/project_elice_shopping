async function getOrderInfo() {
  const res = await fetch(`http://34.22.80.21/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  const date = res.json();
  return data;
}

// 주문 완료 페이지 로드 후 실행될 즉시 실행 함수
document.addEventListener("DOMContentLoaded", async function () {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("oid");

  // 서버에서 주문 정보 가져오기
  const orderInfo = await getOrderInfo(orderId);

  // 주문 정보를 페이지에 표시
  const orderTable = document.querySelector(".orderInfo");

  // 주문 일시
  const orderDateCell = orderTable.querySelector(
    "tr:nth-child(1) td:nth-child(2)"
  );
  orderDateCell.textContent = orderInfo.orderDate;

  // 주문자명 (예시: userId 대신 실제 필요한 데이터 사용)
  const orderUserNameCell = orderTable.querySelector(
    "tr:nth-child(1) td:nth-child(4)"
  );
  orderUserNameCell.textContent = orderInfo.userId;

  // 주문번호
  const orderIdCell = orderTable.querySelector(
    "tr:nth-child(2) td:nth-child(2)"
  );
  orderIdCell.textContent = orderInfo._id;

  // 결제금액 (예시로 고정값 사용)
  const orderPriceCell = orderTable.querySelector(
    "tr:nth-child(3) td:nth-child(4)"
  );
  orderPriceCell.textContent = "100,000원"; // 예시: 실제 결제 금액 데이터 사용

  // 주문번호 입력
  const orderNumElement = document.getElementById("orderNum");
  orderNumElement.innerHTML += orderInfo._id;
})();

document.addEventListener("DOMContentLoaded", function () {
  const gotoHome = document.querySelector(".goHome");
  const goOrderDetail = document.querySelector(".orderDetail");

  goOrderDetail.addEventListener("click", () => {
    window.location.href = "#"; // 해당 주문 내역 페이지의 URL로 이동
  });

  gotoHome.addEventListener("click", () => {
    window.location.href = "./perfume/index.html"; // 메인페이지 URL로 이동
  });
});
