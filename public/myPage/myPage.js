import { categories } from "../common/js/categoryRemote";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserList,
} from "../common/js/userRemotes";

// /mypage에서 User Date가 없으면 /signin 경로롤 리디렉

// 로그아웃 버튼 클릭시 User token 삭제
console.log(categories);
