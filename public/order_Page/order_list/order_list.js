const cancelBtn = document.querySelectorAll(".cancel-btn");

function onCancelButtonClick() {
  const check = confirm("정말 주문을 취소하시겠습니까?");
  console.log(check);

  if (check == true) {
    window.open("#", _name);
  }
}

cancelBtn.forEach((el) => {
  el.addEventListener("click", onCancelButtonClick);
});
