// board 서버 프로그램 생성.
const express = require("express");
const cors = require("cors");

const mysql = require("./sql/index");

// express app setup
const app = express();
const port = 3000;

// 정적디렉토리 설정.
app.use(express.static("public"));
app.use(cors());

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("board");
});

// 로그인.
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; // 사용자 입력값.
    let result = await mysql.queryExecute(
      "SELECT * FROM customers WHERE email = ? AND password_hash = ?",
      [email, password]
    );
    console.log(result);
    let user = result[0];
    // 조회된 사용자가 없을 때
    if (!user) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    // password hash 비교.
    if (password === user.password_hash) {
      res.send({
        message: "Login successful",
        userId: user.email,
        name: user.name,
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 회원가입
app.post("/signup", async (req, res) => {
  try {
    const { name, password, email, phone } = req.body; // 사용자 입력값.

    // db insert values.
    const param = {
      name: name,
      password_hash: password,
      email: email,
      phone: phone,
    };
    // insert 쿼리 실행.
    let result = await mysql.queryExecute(`INSERT INTO customers SET ?`, param);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// tbl_board table - select all(목록조회)
app.get("/boards", async (req, res) => {
  let result = await mysql.queryExecute("SELECT * FROM tbl_board", []);
  res.send(result);
});

// 등록
app.post("/board", async (req, res) => {
  const param = req.body.param; // {title: 'test', content: 'content'}
  // insert 쿼리 실행.
  let result = await mysql.queryExecute(`INSERT INTO tbl_board SET ?`, param);
  res.send(result);
});

// 단건조회
app.get("/board/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    "SELECT * FROM tbl_board WHERE id = ?",
    id
  );
  res.send(result);
});

// 수정
app.put("/board", async (req, res) => {
  const param = req.body.param; // [{title: 'test', content: 'content'}, 6]
  // update 쿼리 실행.
  let result = await mysql.queryExecute(
    `UPDATE tbl_board SET ? WHERE id = ?`,
    param
  );
  res.send(result);
});

// 삭제
app.delete("/board/:id", async (req, res) => {
  const id = req.params.id;
  // delete 쿼리 실행
  let result = await mysql.queryExecute(`DELETE FROM tbl_board WHERE id = ?`, [
    id,
  ]);
  res.send(result);
});

// tbl_reply table - select all(댓글목록조회)
app.get("/reply/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    `SELECT r.* 
     FROM tbl_reply r
     JOIN tbl_board b
     ON r.id = b.id
     WHERE r.id = ?`,
    id
  );
  res.send(result);
});

// 댓글 등록
app.post("/reply", async (req, res) => {
  const param = req.body.param; // {title: 'test', content: 'content'}
  // insert 쿼리 실행.
  let result = await mysql.queryExecute(`INSERT INTO tbl_reply SET ?`, param);
  res.send(result);
});

// 댓글 삭제
app.delete("/reply/:id", async (req, res) => {
  const id = req.params.id;
  // delete 쿼리 실행
  let result = await mysql.queryExecute(
    `DELETE FROM tbl_reply WHERE reply_id = ?`,
    [id]
  );
  res.send(result);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`http://localhost:${port}`);
});
