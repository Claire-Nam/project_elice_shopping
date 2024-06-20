document.addEventListener("DOMContentLoaded", async () => {
  const logOut = document.getElementById("logout");

  if (logOut) {
    logOut.addEventListener("click", (event) => {
      event.preventDefault(); // a 태그의 기본 동작(페이지 이동)을 막습니다.

      // localStorage에서 authToken과 userName을 삭제합니다.
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");

      alert("로그아웃 되었습니다.");

      // 로그인 페이지로 이동
      location.href = "/public/sign/signin.html";
    });
  } else {
    console.error("Logout button not found");
  }

  function userProfile(name, email) {
    return `
      <li id="userName" class="dataList">회원 이름 : ${name}</li>
      <li id="userAddress" class="dataList">이메일 : ${email}</li>
    `;
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/public/sign/signin.html";
    return;
  }

  try {
    const user = await fetch("http://34.22.80.21/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((x) => x.json());

    if (user.error) {
      console.error("Failed to fetch user data", user.error);
      return;
    }

    const html = userProfile(user.fullName, user.email);
    document.querySelector("#profile").innerHTML = html;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
