document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (event) => {
    const idInput = document.getElementById("formId");
    const pwInput = document.getElementById("formPw");

    if (idInput.value === "" || pwInput.value === "") {
      event.preventDefault();
      alert("아이디와 비밀번호를 입력해 주세요.");
    }
  });
});
