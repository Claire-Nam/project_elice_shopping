document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 제출을 막습니다.

      var userName = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPassword").value;
      var name = document.getElementById("name").value;
      var postcode = document.getElementById("sample6_postcode").value;
      var address = document.getElementById("sample6_address").value;
      var detailAddress = document.getElementById(
        "sample6_detailAddress"
      ).value;
      var extraAddress = document.getElementById("sample6_extraAddress").value;

      // 아이디 확인 (이메일 형식으로 변경)
      if (!userName) {
        alert("아이디를 입력해 주세요. (영문소문자/숫자, 4~16자)");
        return;
      }

      var usernamePattern = /^[a-z0-9]{4,16}$/;
      if (!usernamePattern.test(userName)) {
        alert("아이디는 영문소문자/숫자, 4~16자로 입력해 주세요.");
        return;
      }

      // 비밀번호 확인
      if (password.length < 8 || password.length > 16) {
        alert("비밀번호는 8~16자로 입력해 주세요.");
        return;
      }

      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 이름 확인
      if (!name) {
        alert("이름을 입력해 주세요.");
        return;
      }

      // 주소 객체 생성
      var addressObj = {
        postcode: postcode,
        address: address,
        detailAddress: detailAddress,
        extraAddress: extraAddress,
      };

      // 회원가입 처리 로직을 여기에 추가합니다.
      console.log({
        userName: userName,
        password: password,
        name: name,
        address: addressObj,
      });

      // 여기서 실제 폼 제출 로직을 추가할 수 있습니다.
      // 예: 서버에 데이터를 전송하거나 페이지를 이동합니다.
    });
});
