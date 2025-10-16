// todo.js
import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);

//console.table(jsonObj);
// reduce 출력: Female => id, fullName, email, salary => resultAry
//  1, 'Stillmann Speirs', 'sspeirs0@symantec.com', 7506

let resultAry = jsonObj.reduce((acc, elem) => {
  if (elem.gender === "Female") {
    acc.push({
      id: elem.id,
      fullName: `${elem.first_name} ${elem.last_name}`,
      email: elem.email,
      salary: elem.salary,
    });
  }
  return acc;
}, []);

console.table(resultAry);

// jsonObj의 gender별 인원.
// Male: ['Hamilton', 'Freeman', ...]
// Female: ['Hamilton', 'Freeman', ...]
// 객체의 속성 acc[key]

let genderGroup = jsonObj.reduce((acc, elem) => {
  let key = elem.gender;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(elem.last_name);
  return acc;
}, {});

console.log(genderGroup);
