const express = require("express");
const mysql = require("./sql/index");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// express app setup
const app = express();
const port = 3000;

// 정적디렉토리 설정.
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tnals686@daum.net",
    pass: "poiafgyfwopqduqd",
  },
});

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 로그인.
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; // 사용자 입력값.
    // 비동기처리.
    const promise = new Promise((resolve, reject) => {
      let salt = crypto.randomBytes(64).toString("base64"); // salt 생성
      crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
        if (err) {
          return reject(err);
        }
        resolve({ password: key.toString("base64") }); // 비동기처리의 결과.
      });
    });
    let cryptoData = await promise;
    console.log(cryptoData.password);
    let result = await mysql.queryExecute(
      "SELECT * FROM customers WHERE email = ? AND password_hash = ?",
      [email, cryptoData.password]
    );
    console.log(result);
    res.send(result);
    let user = result[0];
    // password hash 비교.
    if (cryptoData.password === user.password_hash) {
      res.send({ message: "Login successful", userId: user.email });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, password, email, phone } = req.body; // 사용자 입력값.
    // 비동기처리.
    const promise = new Promise((resolve, reject) => {
      let salt = crypto.randomBytes(64).toString("base64"); // salt 생성
      crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
        if (err) {
          return reject(err);
        }
        resolve({ salt: salt, password: key.toString("base64") }); // 비동기처리의 결과.
      });
    });
    let cryptoData = await promise;
    // db insert values.
    const param = {
      name: name,
      password_hash: cryptoData.password,
      password_salt: cryptoData.salt,
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

app.get("/sendmail", async (req, res) => {
  console.log(req.query);

  const id = req.query.userid;
  const phone = req.query.phone;
  let result = await mysql.queryExecute(
    "SELECT email FROM customers WHERE id = ? AND phone = ?",
    [id, phone]
  );
  console.log(result);

  const data = {
    from: "tnals686@daum.net",
    to: `${result[0].email}`,
    subject: "새로운 비밀번호",
    html: "<p>새로운 비밀번호: 12345</p>",
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.send("Email sent successfully");
    }
  });
});

// nodemailer test route.

// customers table - select all(목록조회)
app.get("/customers", async (req, res) => {
  let result = await mysql.queryExecute("SELECT * FROM customers", []);
  res.send(result);
});

// 단건조회
app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    "SELECT * FROM customers WHERE id = ?",
    [id]
  );
  res.send(result);
});

app.post("/customer", async (req, res) => {
  const param = req.body.param; // {name: 'test', email: 'email'}
  // insert 쿼리 실행.
  let result = await mysql.queryExecute(`INSERT INTO customers SET ?`, param);
  res.send(result);
});

app.delete("/customer/:id", async (req, res) => {
  const id = req.params.id;
  // delete 쿼리 실행
  let result = await mysql.queryExecute(`DELETE FROM customers WHERE id = ?`, [
    id,
  ]);
  res.send(result);
});

app.put("/customer", async (req, res) => {
  const param = req.body.param; // [{name: 'test', email: 'email'}, 6]
  // update 쿼리 실행.
  let result = await mysql.queryExecute(
    `UPDATE customers SET ? WHERE id = ?`,
    param
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
