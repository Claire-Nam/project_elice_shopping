document.addEventListener("DOMContentLoaded", function () {
  const orderTable = document.querySelector('[data-id="orderTable-items"]');

  // Function to load order list
  async function loadOrderList() {
    try {
      const response = await fetch("http://34.22.80.21/api/orders/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Function to render orders into the table
  async function renderOrders() {
    const orders = await loadOrderList();

    orders.forEach((order) => {
      const row = document.createElement("tr");

      // 주문번호 (링크)
      const orderIdCell = document.createElement("td");
      const orderIdLink = document.createElement("a");
      orderIdLink.href = "#"; // Replace with actual order detail link
      orderIdLink.textContent = order.orderNumber; // Adjust according to your data structure
      orderIdCell.appendChild(orderIdLink);
      row.appendChild(orderIdCell);

      // 이미지 셀
      const imageCell = document.createElement("td");
      const image = document.createElement("img");
      image.src = "../order_Page/Image/perfume.jpeg"; // Adjust based on actual image data
      image.style.width = "75px";
      image.style.height = "50px";
      imageCell.appendChild(image);
      row.appendChild(imageCell);

      // 상품명
      const itemCell = document.createElement("td");
      itemCell.textContent = order.productName; // Adjust based on your data structure
      row.appendChild(itemCell);

      // 가격
      const priceCell = document.createElement("td");
      priceCell.textContent = `₩${order.price.toLocaleString()}`; // Format price if needed
      row.appendChild(priceCell);

      // 수량
      const quantityCell = document.createElement("td");
      quantityCell.textContent = order.quantity; // Adjust based on your data structure
      row.appendChild(quantityCell);

      // 주문상태
      const statusCell = document.createElement("td");
      statusCell.textContent = order.status; // Adjust based on your data structure
      row.appendChild(statusCell);

      // 교환/취소
      const actionCell = document.createElement("td");
      if (order.status === "결제 완료" || order.status === "배송준비중") {
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel-btn";
        cancelBtn.textContent = "주문 취소";
        cancelBtn.setAttribute("attr-order-id", order.orderId); // Adjust based on your data structure
        actionCell.appendChild(cancelBtn);
      } else if (order.status === "배송중" || order.status === "배송 완료") {
        const exchangeBtn = document.createElement("button");
        exchangeBtn.className = "exchange";
        const exchangeLink = document.createElement("a");
        exchangeLink.href = "../order_exchange/exchange.html"; // Replace with actual link
        exchangeLink.textContent = "교환/반품";
        exchangeBtn.appendChild(exchangeLink);
        actionCell.appendChild(exchangeBtn);
      }
      row.appendChild(actionCell);

      // Add row to the table
      orderTable.querySelector("tbody").appendChild(row);
    });
  }

  // Call the renderOrders function to load and render orders
  renderOrders().catch((error) => {
    console.error("Failed to render orders:", error);
  });

  // Event delegation for cancel button click event
  orderTable.addEventListener("click", async function (event) {
    if (event.target.classList.contains("cancel-btn")) {
      const orderId = event.target.getAttribute("attr-order-id");

      const check = confirm("정말 주문을 취소하시겠습니까?");
      if (check) {
        try {
          const response = await fetch(
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
            window.location.href = "../order_exchange/exchange.html";
            // Redirect or handle cancellation success
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
  });
});

// cancelBtn.forEach((el) => {
//   el.addEventListener("click", onCancelButtonClick);
//  });
