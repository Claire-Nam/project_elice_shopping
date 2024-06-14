document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 동작 막기

    // 입력값 가져오기
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const name = document.getElementById("name").value;
    // const address = document.getElementById("address").value;
    // const submit = document.getElementById("address").value;

    console.log(username);

    // 유효성 검사
    const usernamePattern = /^[a-z0-9]{4,16}$/; // 영문 소문자/숫자, 4~16자
    const passwordPattern = /^.{8,16}$/; // 8~16자

    if (!usernamePattern.test(username)) {
      alert("아이디는 영문 소문자와 숫자 조합으로 4~16자로 입력해 주세요.");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("비밀번호는 8~16자로 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호 확인이 비밀번호와 일치하지 않습니다.");
      return;
    }

    if (name.trim() === "") {
      alert("이름을 입력해 주세요.");
      return;
    }

    // if (address.trim() === "") {
    //   alert("주소를 입력해 주세요.");
    //   return;
    // }

    // 유효성 검사를 모두 통과하면 폼을 제출 (혹은 다른 동작 수행)
    alert("회원가입이 완료되었습니다!");
    // 실제로 폼을 제출하려면 아래 주석을 해제합니다.
    signupForm.submit();
    window.location.href = "/signin"; // 회원가입 완료시 로그인 페이지로 이동
  });
});

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
