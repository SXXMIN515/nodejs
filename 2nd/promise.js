// promise.js
// pending/ fulfilled/ rejected, then()/chatch()
const promise = new Promise(function (resolve, reject) {
  // 정상완료 => 첫번째 매개값으로 받은 함수호출.
  // 거부 => 두번째 매개값으로 받은 함수호출.
  try {
    // console.logs("hhhh");
    setTimeout(function () {
      resolve({ retCode: "Success", retVal: ["hong", "kim", "park"] });
    }, 1000);
  } catch (err) {
    reject(new Error("Error !!!"));
  }
});

promise
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.error(err);
  });
