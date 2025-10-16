// crypto.js
const crypto = require("crypto");
const { resolve } = require("path");

let cryptPasswd = crypto
  .createHash("sha256")
  .update("sample123")
  .digest("base64");

console.log(cryptPasswd);

// 1. DB의 값을 암호화값 vs. 사용자 입력한 값 암호화값 => 비교후 판별.
let fixedSalt =
  "J3lqiu0zJkGv/qRSnac2wN+zNrfGUk7CzfiqD1SemyA7OggSKw7NcjJrm0JykyLe0YsWOiijKZ6HI4a/F7qFSg==";
async function getCryptoPassword(password) {
  // 1. salting 임의의 구문. => 동일한 평문(비밀번호) -> 다른 암호값.
  // let salt = crypto.randomBytes(64).toString("base64");
  let dbPass =
    "dn9aJxjWeSdOyF0w9/5PwawCWZJ0i7izBIfy7GnF7hIzWspu0E9jlgzINarn0mYiKbme1tDI0/IOkpfUdO2tRw==";
  console.log(fixedSalt);
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, fixedSalt, 100000, 64, "sha512", (err, key) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log(dbPass == key.toString("base64") ? "same" : "different");
      resolve(dbPass == key.toString("base64") ? "same" : "different");
    });
  });
}

getCryptoPassword(`test123`) //
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
