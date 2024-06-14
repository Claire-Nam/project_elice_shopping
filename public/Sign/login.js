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

    // 로그인 완료 후 seccion또는 token으로 User정보 저장
    // /mypage 경로에서 User Date가 없으면 /signin 경로롤 리디렉

    // 로그인 완료시 루트페이지로 이동
    const link = "../index.html";
    location.href = link;
  });
