const authToken = localStorage.getItem("authToken");

if (authToken === null) {
  alert("로그인이 필요한 서비스입니다.");
  location.href = "/Sign/signin.html";
}
