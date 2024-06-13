function cancelCheck() {
  const cancelBtn = document.querySelector(".cancel-btn");
  const check = confirm("정말 주문을 취소하시겠습니까?");
  console.log(check);

  if (check == true) {
    window.open("#", _name);
  }
}

cancelBtn.addEventListener("click", cancelCheck());
