// todo.js
// sample.txt 단어 갯수 => ?개, 'e'문자가 포함된 단어의 갯수 => ?개
// split, index of
const fs = require("fs"); // 내장모듈. File System

fs.readFile("sample.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let wordCount = data.split(" ");
  console.log(wordCount);
  console.log(wordCount.length);

  let eCount = wordCount.reduce((acc, elem) => {
    if (elem.indexOf("e") != -1) {
      acc.push(elem);
    }
    return acc;
  }, []);
  console.log(eCount.length);
});

// fs.readFile("sample.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   let wordCount;
//   let eCount;
//   let words = data.split(" ");

//   let result = words.reduce((acc, elem) => {
//     wordCount = words.length;
//     acc.push(wordCount);

//     eCount = words.reduce((acc2, elem2) => {
//       if (elem.indexOf("e") != -1) {
//         acc2.push(elem2);
//       }
//       return acc2;
//     }, []);
//     // console.log(eCount);
//     acc.push(eCount.length);
//     return acc;
//   }, []);
//   console.log(result);
//   // console.log(
//   //   `단어 갯수 => ${wordCount}개, 'e'문자가 포함된 단어의 갯수 => ${eCount.length}개`
//   // );
// });
