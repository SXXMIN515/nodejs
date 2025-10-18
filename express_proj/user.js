// user.js
const fs = require("fs");

const userCheck = (id, pw) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./user_info.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading user info:", err);
        reject("Internal Server Error (File Read Failed)");
        return;
      }
      const foundUser = data.split("\n").find((member) => {
        const [user, pass, name] = member.split(",");
        return id.trim() === user.trim() && pw.trim() === pass.trim();
      });

      let result;
      if (foundUser) {
        const [, , name] = foundUser.split(",");
        result = name.trim() + "님 환영합니다.";
      } else {
        result = "ID, PW를 확인하세요.";
      }
      resolve(result);
    });
  });
};

module.exports = { userCheck };
