const express = require("express");
const mysql = require("./sql");
const xlsx = require("xlsx");
const fs = require("fs");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cron = require("node-cron"); // 주기적인 작업처리.
const winston = require("winston"); // 로그관리 모듈.

const app = express();
const PORT = 3000;

// 서버 설정.

// body-parser 대신 express 내장함수 사용.
app.use(express.urlencoded({ extended: false })); // user=1234&name=hong
app.use(
  express.json({
    limit: "50mb",
  })
);

// 정적디렉토리 설정.
app.use(express.static("public"));

// 라우팅 정보.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 고객정보 => 이메일로 발송.
// cron/start get요청. 10분단위로 고객의 정보를 메일발송.
// id/name/email/phone/address
// 15/김동현/6@6/010-1111-1661/울산
// ......
// 23/
// 텍스트 형식으로 발송
const logger = winston.createLogger({
  level: "info", // error > warn > info > http > verbose > debug > silly
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log/info.log" }),
  ],
});

app.get("/cron/start", async (req, res) => {
  try {
    const task = cron.schedule(
      "* * * * * *",
      async () => {
        let result = await mysql.queryExecute(
          "SELECT id, name, email, phone, address FROM customers",
          []
        );
        // console.log(result);
        logger.info(result);
      },
      {
        scheduled: false,
      }
    );
    task.start();
    res.send("고객정보 이메일 발송 완료!");
  } catch (err) {
    logger.error(`${err}`);
  }
});

// cron/stop get요청. 종료
app.get("/cron/stop", (req, res) => {
  res.send("Hello World!");
});

// customers 테이블 조회 => 엑셀 => 이메일전송 시 첨부파일.
// '/customerInfo' GET 요청 처리.
function db_to_excel() {
  // mysql에서 고객데이터 조회 -> 엑셀파일로 저장
  mysql
    .queryExecute("SELECT id, name, email, phone, address FROM customers", [])
    .then((result) => {
      console.log(result); // 엑셀파일 데이터.
      // 워크북 생성 -> sheet 추가 -> 파일저장
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers"); // workbook에 sheet 추가
      xlsx.writeFile(workbook, "./files/customers3.xlsx"); // 파일저장
    })
    .catch((err) => {
      console.error(err);
    });
}

// nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tnals686@daum.net",
    pass: "poiafgyfwopqduqd",
  },
});

function mailSendFunc() {
  const data = {
    from: "tnals686@daum.net",
    to: "ksb327d2@gmail.com",
    subject: "subject",
    html: "Sample Content",
    attachments: [
      {
        filename: "customers3.xlsx",
        path: "./files/customers3.xlsx",
      },
    ],
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

app.get("/customerInfo", async (req, res) => {
  try {
    db_to_excel();
    mailSendFunc();
    res.send("엑셀파일 생성 및 이메일 전송 완료!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/upload/:productId/:type/:fileName", (req, res) => {
  const dir = `upload/${req.params.productId}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = `${dir}/${req.params.fileName}`;
  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(";base64") + 8
  );
  fs.writeFile(`${filePath}`, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 저장 중 오류가 발생했습니다.");
    }
    console.log("파일이 성공적으로 저장되었습니다.");
  });
  res.send("OK");
});

// 파일업로드 설정.
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정.
  destination: function (req, file, cb) {
    const uploadDir = "upload";
    if (!fs.existsSync(uploadDir)) {
      // 폴더가 없으면 동기적으로 생성합니다.
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  // 업로드된 파일의 이름 설정.
  filename: function (req, file, cb) {
    // 파일명에 포함된 한글을 Buffer로 처리하여 안전한 파일명 생성
    const originalName = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); // 한글처리.
    cb(null, Date.now().valueOf() + originalName); // 2025-08-20-시간+홍길동.xlsx
  },
});
// multer 객체 생성.
const upload = multer({ storage: storage });

function excel_to_db(uploadXlsx) {
  // mysql -> excel
  // workbook - sheet
  const workbook = xlsx.readFile(`./upload/${uploadXlsx}`);
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트명
  const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트
  const excelData = xlsx.utils.sheet_to_json(firstSheet); // 시트 -> json배열

  // json배열 -> mysql insert
  excelData.forEach(async (item) => {
    let result = await mysql.queryExecute("INSERT INTO customers SET ?", [
      item,
    ]);
  });
}

app.post("/upload/excels", upload.array("excelFile", 10), async (req, res) => {
  try {
    // 멀티파트 폼데이터 처리. => db 저장.
    // console.log(req.files[0].filename); // 여러 파일 정보 (배열)
    req.files.forEach((item) => {
      excel_to_db(item.filename);
    });
    // for (const item of req.files) {
    //   await excel_to_db(item.filename);
    // }
    res.send("여러 엑셀파일 업로드 및 db 저장 완료!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
