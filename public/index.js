document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.querySelector(".signup");
  const signinButton = document.querySelector(".signin");
  const myPageButton = document.querySelector(".myPage");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 동작 막기
    window.location.href = "./sign/signup.html"; // 회원 가입 페이지 URL로 변경
  });

  signinButton.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 동작 막기
    window.location.href = "./sign/signin.html"; // 로그인 페이지 URL로 변경
  });

  myPageButton.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 동작 막기
    window.location.href = "./myPage/myPage.html"; // 마이 페이지 URL로 변경
  });
});
