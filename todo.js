// todo.js
import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);

console.table(jsonObj);
// reduce 출력: Female => id, fullName, email, salary => resultAry
//  1, 'Stillmann Speirs', 'sspeirs0@symantec.com', 7506

let resultAry = jsonObj.reduce(function (acc, elem) {
  // console.log(acc, elem);
  if (elem.gender == "Female") {
    acc.push(elem);
  }
  return acc.map(function (elem2) {
    if (elem2.gender == "Female") {
      console.log(`${elem2.first_name} ${elem2.last_name}`);
    }
    const person = {};
    person.id = elem2.id;
    person.fullName = `${elem2.first_name} ${elem2.last_name}`;
    person.email = elem2.email;
    person.gender = elem2.gender;
    person.salary = elem2.salary;
    return person;
  });
}, []);

console.table(resultAry);

// jsonObj의 gender별 인원.
// Male: ['Hamilton', 'Freeman', ...]
// Female: ['Hamilton', 'Freeman', ...]
// 객체의 속성 acc[key]
