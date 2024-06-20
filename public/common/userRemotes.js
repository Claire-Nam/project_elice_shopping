// 서버 API 통신하는 함수들이 모여있는 파일을 만들어주세요.
// 페이지별로 동작하는 js는 해당 파일에서 정의된 함수를 활용해주세요.

// Base Url
const API_BASE_URL = "http://34.22.80.21/api";

// User remotes

// 회원가입
async function registerUser(
  fullName,
  email,
  password,
  phoneNumber,
  address,
  role = "user"
) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      phoneNumber,
      address,
      role,
    }),
  });
  return response.json();
}

// 로그인
async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// 사용자 정보 수정
async function updateUser(
  token,
  fullName,
  email,
  password,
  phoneNumber,
  address
) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, email, password, phoneNumber, address }),
  });
  return response.json();
}

// 사용자 삭제 (탈퇴)
async function deleteUser(token) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 전체 유저 목록 조회
async function getUserList(token, page = 1) {
  const response = await fetch(`${API_BASE_URL}/userlist?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export { registerUser, loginUser, updateUser, deleteUser, getUserList };
