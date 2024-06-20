async function getOrderDetail(orderId) {
  const res = await fetch(
    "http://localhost:5000/api/orders/6673bdcf65b40901abfe3e7e/6673e816c3791d5a900ab087",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

(async () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("oid") || "";
  const orderItemList = document.querySelector('tbody[data-id="order-itmes"]');

  const data = await getOrderDetail(orderId);

  const rows = data.productList
    .map((product) => {
      return `
    <tr>
      <td>
        <img 
          src="${product.img}
          style="width:75px; height: 50px"
        />
      </td>
      <td>${product.name}</td>
      <td>${product.sold}</td>
      <td>${product.price}</td>
    </tr>
    `;
    })
    .join("");

  orderItemList.innerHTML = rows;
})();

//배송지 정보 수정을 위한 모달박스 창 띄우기/닫기
const openModal = document.querySelector(".modify_info");
const closeModal = document.querySelector(".close");
const modalBox = document.querySelector("#modal_box");

openModal.addEventListener("click", () => {
  modalBox.classList.add("active");
});

//우편번호 찾기 버튼으로 다음 우편번호 서비스 열기
const postcodeBtn = document.querySelector(".input-btn");
postcodeBtn.addEventListener("click", () => {
  search_execDaumPostcode();
});

//다음 우편번호 서비스 실행 함수
function search_execDaumPostcode() {
  new daum.Postcode({
    oncompliete: function (data) {
      let addr = ""; // 주소 변수

      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address1_input").value = addr;
      // 상세주소 필드로 포커스 이동
      document.getElementById("address2_input").focus();
    },
  }).open();
}

// 수정 완료 버튼 클릭 시 정보 반영
const modifyCompleteBtn = document.querySelector("#modify_deliver .close");
modifyCompleteBtn.addEventListener("click", function () {
  const receiverName = document.getElementById("receiver_name").value;
  const receiverPhone = document.getElementById("receiver_phone").value;
  const address =
    document.getElementById("address1_input").value +
    " " +
    document.getElementById("address2_input").value;

  // 받는 사람 정보 업데이트
  const receiverNameElement = document.querySelector(
    ".deliver_info td:nth-child(2)"
  );
  const receiverPhoneElement = document.querySelector(
    ".deliver_info td:nth-child(4)"
  );
  const addressElement = document.querySelector(
    ".deliver_info td:nth-child(6)"
  );

  receiverNameElement.textContent = receiverName;
  receiverPhoneElement.textContent = receiverPhone;
  addressElement.textContent = address;
});

// 모달박스 닫기
closeModal.addEventListener("click", () => {
  modalBox.classList.remove("active");
});
