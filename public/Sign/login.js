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
    try {
      const response = await fetch("http://34.22.80.21/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userName,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // 로그인 성공 시
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userName", userName);

        alert("로그인에 성공했습니다!");

        // 메인 페이지로 이동
        location.href = "/public/main/main.html";
      } else {
        // 로그인 실패 시
        alert(result.reason || "로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      // 서버 오류 또는 네트워크 오류 처리
      console.error("로그인 중 오류가 발생했습니다:", error);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }

    // console.log(`userName : ${userName}\nuserPassword : ${password}`);
  });
