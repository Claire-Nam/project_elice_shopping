document.addEventListener("DOMContentLoaded", async () => {
  const logOut = document.getElementById("logout");
  const deleteUser = document.getElementById("delete");
  const updateProfileButton = document.getElementById("updateProfileButton");
  const profileForm = document.getElementById("profileForm");
  const updateProfileForm = document.getElementById("updateProfileForm");

  if (logOut) {
    logOut.addEventListener("click", (event) => {
      event.preventDefault();

      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");

      alert("로그아웃 되었습니다.");

      location.href = "/Sign/signin.html";
    });
  } else {
    console.error("Logout button not found");
  }

  if (deleteUser) {
    deleteUser.addEventListener("click", async (event) => {
      event.preventDefault();

      const confirmation = confirm("정말로 탈퇴하시겠습니까?");
      if (!confirmation) return;

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "/Sign/signin.html";
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
          localStorage.removeItem("authToken");
          localStorage.removeItem("userName");

          alert("회원 탈퇴가 완료되었습니다.");
          location.href = "/Sign/signin.html";
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

  if (updateProfileButton) {
    updateProfileButton.addEventListener("click", (event) => {
      event.preventDefault();
      profileForm.style.display =
        profileForm.style.display === "none" ? "block" : "none";
    });
  } else {
    console.error("Update profile button not found");
  }

  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const address = document.getElementById("address").value;
      const currentPassword = document.getElementById("currentPassword").value;

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "/Sign/signin.html";
        return;
      }

      try {
        const response = await fetch("http://34.22.80.21/api/users/me", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            phoneNumber,
            address,
            currentPassword,
          }),
        });

        if (response.ok) {
          alert("회원정보가 수정되었습니다.");
          location.reload();
        } else {
          const errorData = await response.json();
          console.error("Failed to update user profile", errorData);
          alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
        alert("회원정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  } else {
    console.error("Update profile form not found");
  }

  function userProfile(name, email, phoneNumber, address) {
    return `
      <li id="userName" class="dataList">회원 이름 : ${name}</li>
      <li id="userEmail" class="dataList">이메일 : ${email}</li>
      <li id="userPhoneNumber" class="dataList">전화번호 : ${phoneNumber}</li>
      <li id="userAddress" class="dataList">주소 : ${address}</li>
    `;
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/Sign/signin.html";
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

    const html = userProfile(
      user.fullName,
      user.email,
      user.phoneNumber,
      user.address
    );
    document.querySelector("#profile").innerHTML = html;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
