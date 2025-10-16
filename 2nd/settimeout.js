// settimeout.js
// 10 -> +2 -> *2 -> +5 => 결과로 출력.

// promise를 async/await

let result = 10;

function delayFunc(delay, operations) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      operations();
      resolve(result);
    }, delay);
  });
}

async function runPromise() {
  try {
    await delayFunc(500, () => {
      result += 2;
    }); // 첫번째작업(결과에 2더하기)
    console.log(result);

    await delayFunc(1000, () => {
      result *= 2;
    }); // 두번째작업(결과에 2배)
    console.log(result);

    await delayFunc(800, () => {
      result += 5;
    }); // 세번째작업(결과에 5더하기)
    console.log(result);
  } catch (err) {
    console.log(new Error("error!!!"));
  }
} // end of runPromise
runPromise();
