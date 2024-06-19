document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    const userName = document.querySelector('input[name="userName"]').value;
    const password = document.querySelector('input[name="userPassword"]').value;

    event.preventDefault(); // 폼 제출을 막습니다.

    if (!userName || !password) {
      alert("아이디 또는 비밀번호를 입력해 주세요");
      event.preventDefault(); // 폼 제출을 막습니다.
      return;
    }
    const result = await fetch("http://34.22.80.21/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${userName}@naver.com`,
        password: password,
      }),
    }).then((x) => x.json());

    if (result.error) {
      alert(result.reason);
    } else {
      localStorage.setItem("authToken", result.token);
      location.href = "/public/main/main.html";
      // TODO: 로그인 되면 페이지 이동 처리
    }

    console.log(`userName : ${userName}\nuserPassword : ${password}`);
  });
