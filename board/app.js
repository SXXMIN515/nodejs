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

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
