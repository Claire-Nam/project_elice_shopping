const cancelBtn = document.querySelectorAll(".cancel-btn");

function cancelCheck() {
  const check = confirm("정말 주문을 취소하시겠습니까?");
  console.log(check);

  if (check == true) {
    window.open("#", _name);
  }
}

cancelBtn.addEventListener("click", cancelCheck);
