async function getOrderInfo(orderId) {
  try {
    const res = await fetch(`http://34.22.80.21/api/orders?oid=${orderid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order information");
    }

    const data = await res.json(); // Corrected to await JSON parsing
    return data;
  } catch (error) {
    console.error("Error fetching order information:", error);
    return null; // Return null or handle error accordingly
  }
}

// 주문 완료 페이지 로드 후 실행될 즉시 실행 함수
document.addEventListener("DOMContentLoaded", async function () {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("oid");

  if (!orderId) {
    console.error("No order ID found in query parameters");
    return;
  }

  try {
    // 서버에서 주문 정보 가져오기
    const orderInfo = await getOrderInfo(orderId);

    if (!orderInfo) {
      console.error("Failed to fetch order information");
      return;
    }

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
    orderUserNameCell.textContent = orderInfo.userId; // Adjust based on your data structure

    // 주문번호
    const orderIdCell = orderTable.querySelector(
      "tr:nth-child(2) td:nth-child(2)"
    );
    orderIdCell.textContent = orderInfo._id;

    // 결제금액 (예시로 고정값 사용)
    const orderPriceCell = orderTable.querySelector(
      "tr:nth-child(3) td:nth-child(4)"
    );
    orderPriceCell.textContent = `₩${orderInfo.price.toLocaleString()}`;

    // 주문번호 입력
    const orderNumElement = document.getElementById("orderNum");
    orderNumElement.textContent = orderInfo._id;
  } catch (error) {
    console.error("Error loading order information:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const gotoHome = document.querySelector(".goHome");
  const goOrderDetail = document.querySelector(".orderDetail");

  goOrderDetail.addEventListener("click", () => {
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("oid");
    window.location.href = `../order_Page/order_detail/order_detail.html?oid=${orderId}`;
  });

  gotoHome.addEventListener("click", () => {
    window.location.href = "../main/main.html";
  });
});
