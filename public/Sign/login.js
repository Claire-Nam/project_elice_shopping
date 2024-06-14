document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    var userName = document.querySelector('input[name="userName"]').value;
    var userPassword = document.querySelector(
      'input[name="userPassword"]'
    ).value;

    if (!userName || !userPassword) {
      alert("아이디 또는 비밀번호를 입력해 주세요");
      event.preventDefault(); // 폼 제출을 막습니다.
    }
  });
