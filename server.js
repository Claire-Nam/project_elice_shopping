const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/sign", "signup.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/sign", "signin.html"));
});
app.get("/mypage", (req, res) => {
  res.sendFile(path.join(__dirname, "public/myPage", "myPage.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
