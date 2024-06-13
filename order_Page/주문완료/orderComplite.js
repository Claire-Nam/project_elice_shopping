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
