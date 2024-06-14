document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.querySelector(".signup");
  const signinButton = document.querySelector(".signin");
  const myPageButton = document.querySelector(".myPage");

  signupButton.addEventListener("click", () => {
    window.location.href = "/signup"; // 회원 가입 페이지 URL로 이동
  });

  signinButton.addEventListener("click", () => {
    window.location.href = "/signin"; // 로그인 페이지 URL로 이동
  });
  myPageButton.addEventListener("click", () => {
    window.location.href = "/mypage"; // 마이 페이지 URL로 이동
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.querySelector(".signup");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 동작 막기
    window.location.href = "/signup"; // 회원 가입 페이지 URL로 변경
  });
});
