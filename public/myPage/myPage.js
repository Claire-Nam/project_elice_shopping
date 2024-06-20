document.addEventListener("DOMContentLoaded", async () => {
  const logOut = document.getElementById("logout");
  const deleteUser = document.getElementById("delete");

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

  if (deleteUser) {
    deleteUser.addEventListener("click", async (event) => {
      event.preventDefault(); // a 태그의 기본 동작(페이지 이동)을 막습니다.

      const confirmation = confirm("정말로 탈퇴하시겠습니까?");
      if (!confirmation) return;

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "/public/sign/signin.html";
        return;
      }

      try {
        const response = await fetch("http://34.22.80.21/api/users/me", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // localStorage에서 authToken과 userName을 삭제합니다.
          localStorage.removeItem("authToken");
          localStorage.removeItem("userName");

          alert("회원 탈퇴가 완료되었습니다.");
          // 로그인 페이지로 이동
          location.href = "/public/sign/signin.html";
        } else {
          const errorData = await response.json();
          console.error("Failed to delete user", errorData);
          alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  } else {
    console.error("Delete button not found");
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
