// literal.js
import { getStudentInfo } from "./data.js";

let myName = "홍길동";
console.log("Hello, " + myName);
console.log(`Hello, ${myName}`);

let n1 = 10;
let n2 = 11;
console.log(`n1 + n2 = ${n1 + n2}`);

console.log(
  `${getStudentInfo()
    .map((person) => "친구이름=>" + person)
    .join(" ")}`
);

// 펼침연산자(spread operator)
let friends = ["김민규", "박철홍"];
console.log(...friends);
let newAry = [...friends, ...getStudentInfo()];
console.log(newAry);

// Object Destructuring
const person = {
  firstName: "Kildong",
  lastName: "Hong",
  age: 20,
};
// let firstName = person.firstName;
let { firstName: fn, lastName: ln, age } = person;
console.log(fn, ln, age);

// Array Destructuring
// "홍길동", "김민식", "박충원", "홍영기"
let [ary1, ary2, ...ary3] = getStudentInfo();
console.log(ary1, ary2, ary3);

// Default Function Parameter.
function minus(n1 = 0, n2 = 0) {
  return n1 - n2;
}
console.log(minus(10));
