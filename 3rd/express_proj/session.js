// session.js
const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 3000;

// JSON 파싱을 위해
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-session 미들웨어 설정
app.use(
  cookieSession({
    name: "session",
    keys: ["secretKey1", "secretKey2"], // 쿠키 서명을 위한 키 배열
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  })
);

// 첫 방문 시 session.count 초기화
app.get("/", (req, res) => {
  req.session.count = req.session.count || 0;
  req.session.count++;

  res.send(`<h1>방문 횟수: ${req.session.count}</h1>
            <p><a href="/logout">로그아웃</a></p>`);
});

// 세션 종료 (쿠키 삭제)
app.get("/logout", (req, res) => {
  req.session = null; // 세션 삭제
  res.send("로그아웃 되었습니다. <a href='/'>홈으로</a>");
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
