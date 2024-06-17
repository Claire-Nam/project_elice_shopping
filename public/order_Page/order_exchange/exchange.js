const exchangeBtn = document.querySelector(".exchangeSubmit");
const cancelBtn = document.querySelector(".exchangeCancel");

function check() {
  const notice = alert(
    "교환을 신청하셨습니다.\n내용 확인 후 답변드리겠습니다."
  );
  console.log(notice);

  if (notice == true) {
    window.location.replace("./order_list.html");
  }
}

exchangeBtn.addEventListener("click", check);
cancelBtn.addEventListener("click", () => {
  window.location.replace("./perfume/index.html");
});
