// const express = require("express");
// const path = require("path");
// const app = express();
// const port = 3000;

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // Routes
// app.get("/", (req, res) => {
//   // ---- 이후 public 디렉토리 하위 각 폴더별로 라우터 변경
//   res.sendFile(path.join(__dirname, "public", "index.html")); // 브랜치 병합 이후 여러분들 폴더를 public폴더로 옮겨야함
// });

// // *********** User Page 관련 ***************
// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/sign", "signup.html"));
// });
// app.get("/signin", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/sign", "signin.html"));
// });
// app.get("/mypage", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/myPage", "myPage.html"));
// });

// // *********** Order Page 관련 ***************
// // app.get("/orderList", (req, res) => {
// //   res.sendFile(
// //     path.join(__dirname, "public/order_Page", "파일명 넣어주세요.html")
// //   );
// // });
// // app.get("/orderList", (req, res) => {
// //   res.sendFile(
// //     path.join(__dirname, "public/order_Page", "파일명 넣어주세요.html")
// //   );
// // });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
