// timer.js
// setTimeout, setInterval
const fs = require("fs");
const process = require("process");
const os = require("os");

// process.exit();
console.log(os.arch());
console.log(os.cpus());
console.log(os.networkInterfaces());

setTimeout(() => {
  console.log("한번만 실행.");
}, 1000);

fs.readFile("./sample.txt11", "utf-8", (err, data) => {
  //
  if (err) {
    return;
  }
  let cnt = 0;
  let max = data.length;
  let job = setInterval(() => {
    console.clear();
    console.log(data.substring(0, cnt++));
    if (cnt == max) {
      clearInterval(job); // 실행하는 job 종료.
    }
  }, 200);
});
