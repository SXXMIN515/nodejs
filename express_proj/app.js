const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
const multer = require("multer");

const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const boardRouter = require("./routes/boards");

// 서버인스턴스.
const app = express();

// body-parser 대신 express 내장함수 사용.
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // user=1234&name=hong
// parsing application/json
app.use(express.json());

// 정적디렉토리 설정.
app.use(express.static("public"));

// 쿠키세션 설정.
app.use(
  cookieSession({
    name: "session",
    keys: ["skdkadkald434sklkds", "fdfdlsd3332mde35"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// 파일업로드 설정.
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정.
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // 업로드된 파일의 이름 설정.
  filename: function (req, file, cb) {
    // 한글 파일명 깨짐 방지
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, Date.now() + "-" + originalName);
  },
});
// multer 객체 생성.
const upload = multer({ storage: storage });

// 라우팅 정보가 파일로 나눠서 작성.
// customer.js, product.js
app.use("/customers", customerRouter); // '/', '/add'
app.use("/products", productRouter); // '/', '/add'
// app.use("/boards", boardRouter); // '/', '/add'

// 라우팅 정보 : '/' -> 'page정보', '/list' -> '글목록정보'
// get/post/put/delete 요청정보 처리결과 출력.

app.get("/", (req, res) => {
  fs.readFile("./root.html", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

// 파일업로드 테스트.
app.post("/upload", upload.single("profile"), (req, res) => {
  // 'profile'은 form에서 업로드하는 파일의 name속성값.
  console.log(req.file); //업로드된 파일 정보.
  res.send("파일 업로드 완료!");
});

// 숙제: 여러파일 업로드 처리.

// cookie-session 테스트.
app.get("/", (req, res) => {
  fs.readFile("./root.html", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

fs.readFile("./user_info.txt", "utf-8", (err, data) => {
  if (err) {
    res.status(500).send("Error reading file");
    return;
  }
  let string = data
    .split("\r\n")
    .filter((arr) => {
      return arr.trim(" ");
    })
    .map((line) => {
      const [id, pw, name] = line.split(",");
      return { id, pw, name };
    });
  console.log(string);

  app.get("/login", (req, res) => {
    // if (!req.session.views) {
    //   req.session.views = 1;
    // } else {
    //   req.session.views++;
    // }
    // res.send(`현재 ${req.session.views}번째 방문입니다.
    //   <br><a href="/logout">로그아웃</a>`);
    // res.send(`<!DOCTYPE html>
    //           <html lang="en">
    //             <head>
    //               <meta charset="UTF-8" />
    //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //               <title>Document</title>
    //             </head>
    //             <body>
    //               <p>학번 : ${sno}</p>
    //               <p>이름 : ${sname}</p>
    //               <p>합격여부 : ${
    //                 score >= 60 ? `합격(${score})` : `불합격(${score})`
    //               }</p>
    //             </body>
    //           </html>`);
  });
});

// app.post("/login", (req, res) => {
//   if (!req.session.views) {
//     req.session.views = 1;
//   } else {
//     req.session.views++;
//   }

//   res.send(`현재 ${req.session.views}번째 방문입니다.
//     <br><a href="/logout">로그아웃</a>`);
// });

app.post("/test", (req, res) => {
  console.log(req.body);
  let pass;
  if (req.body.score >= 60) {
    pass = `합격(${req.body.score})`;
  } else {
    pass = `불합격(${req.body.score})`;
  }
  res.send(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    </head>
    <body>
    <p>학번 : ${req.body.sno}</p>
    <p>이름 : ${req.body.sname}</p>
    <p>합격여부 : ${pass}</p>
    </body>
    </html>`
  );
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

// 테스트.
app.get("/test/:sno/:sname/:score", (req, res) => {
  const { sno, sname, score } = req.params;
  let result = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p>학번 : ${sno}</p>
    <p>이름 : ${sname}</p>
    <p>합격여부 : ${score >= 60 ? `합격(${score})` : `불합격(${score})`}</p>
  </body>
</html>`;
  res.send(result);
});

app.post("/test", (req, res) => {
  console.log(req.body);
  let pass;
  if (req.body.score >= 60) {
    pass = `합격(${req.body.score})`;
  } else {
    pass = `불합격(${req.body.score})`;
  }
  res.send(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    </head>
    <body>
    <p>학번 : ${req.body.sno}</p>
    <p>이름 : ${req.body.sname}</p>
    <p>합격여부 : ${pass}</p>
    </body>
    </html>`
  );
});

app.post("/:user/:score", (req, res) => {
  // localhost:3000/hongkildong/90
  console.log(req.params);
  res.send("POST request to the homepage");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
