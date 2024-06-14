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
      alert("회원가입을 완료했습니다. 다시 로그인 해주세요.");
      window.location.href = "/signin";
    });
});

// 주소 찾기 기능
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}
