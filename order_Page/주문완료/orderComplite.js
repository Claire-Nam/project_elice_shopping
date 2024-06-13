const goOrderDetail = document.getElementsByClassName("orderDetail");
const goHome = document.getElementsByClassName("goHome");

goOrderDetail.addEventListner("click", () => {
  window.location.href = "#"; //해당 주문 내역 페이지의 URL로 이동
});

goHome.addEventListner("click", () => {
  window.location.href = "#"; //메인페이지 URL로 이동
});
