// home.js
const employees = [
  { id: 1, name: "Alice", gender: "Female", salary: 5000 },
  { id: 2, name: "Bob", gender: "Male", salary: 4500 },
  { id: 3, name: "Carol", gender: "Female", salary: 7000 },
  { id: 4, name: "David", gender: "Male", salary: 5500 },
  { id: 5, name: "Emma", gender: "Female", salary: 6500 },
];

// 성별별 급여 합계 객체
let genderSalarySum = employees.reduce((acc, elem) => {
  let key = elem.gender;
  if (!acc[key]) {
    acc[key] = 0;
  }
  acc[key] += elem.salary;
  return acc;
}, {});

console.log(genderSalarySum);

// 급여가 6000 이상인 사람들의 이름만 배열로 출력
let sal6000 = employees.reduce((acc, elem) => {
  if (elem.salary >= 6000) {
    acc.push(elem.name);
  }
  return acc;
}, []);

console.log(sal6000);

const staffList = [
  { id: 1, name: "Alice", dept: "HR", salary: 5000 },
  { id: 2, name: "Bob", dept: "IT", salary: 6000 },
  { id: 3, name: "Carol", dept: "HR", salary: 7000 },
  { id: 4, name: "David", dept: "IT", salary: 5500 },
  { id: 5, name: "Emma", dept: "Sales", salary: 6500 },
];

// 부서별 평균 급여
let deptSalaryAvg = staffList.reduce((acc, elem) => {
  let key = elem.dept;
  if (!acc[key]) {
    acc[key] = { sum: 0, count: 0 };
  }
  acc[key].sum += elem.salary;
  acc[key].count++;

  return acc;
}, {});

for (let dept in deptSalaryAvg) {
  deptSalaryAvg[dept] = deptSalaryAvg[dept].sum / deptSalaryAvg[dept].count;
}

console.log(deptSalaryAvg);

const userList = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Carol", age: 41 },
  { name: "David", age: 27 },
  { name: "Emma", age: 35 },
];

// 나이별 총인원
let ageSum = userList.reduce((acc, elem) => {
  let key = Math.floor(elem.age / 10) * 10 + "대";
  if (!acc[key]) {
    acc[key] = 0;
    acc[key]++;
  }
  return acc;
}, {});

console.log(ageSum);

const productList = [
  { name: "Keyboard", price: 50 },
  { name: "Mouse", price: 30 },
  { name: "Monitor", price: 200 },
  { name: "USB", price: 20 },
  { name: "Headset", price: 80 },
];

// 가격이 50 이상인 상품 이름 출력
let price50 = productList.reduce((acc, elem) => {
  if (elem.price >= 50) {
    acc.push(elem.name);
  }
  return acc;
}, []);

console.log(price50);

const workerList = [
  { name: "Alice", gender: "Female", salary: 5000 },
  { name: "Bob", gender: "Male", salary: 4500 },
  { name: "Carol", gender: "Female", salary: 7000 },
  { name: "David", gender: "Male", salary: 5500 },
  { name: "Emma", gender: "Female", salary: 6500 },
];

// gender별 최고 급여자 이름
let genderHighSalary = workerList.reduce((acc, elem) => {
  let key = elem.gender;
  if (!acc[key] || elem.salary > acc[key].salary) {
    acc[key] = elem;
  }
  return acc;
}, {});

for (let gender in genderHighSalary) {
  genderHighSalary[gender] = genderHighSalary[gender].name;
}

console.log(genderHighSalary);

const peopleList = [
  { name: "Alice", salary: 5000 },
  { name: "Bob", salary: 6000 },
  { name: "Carol", salary: 7000 },
];

// 이름: 연봉 배열
let salary12 = peopleList.reduce((acc, elem) => {
  acc.push(`${elem.name}: ${elem.salary}`);
  return acc;
}, []);

console.log(salary12);

const staff = [
  { name: "Alice", salary: 5000 },
  { name: "Bob", salary: 6200 },
  { name: "Carol", salary: 7000 },
  { name: "David", salary: 5500 },
  { name: "Emma", salary: 6500 },
];
// 급여 6000 이상 사람
let sal6 = staff
  .filter((person) => person.salary >= 6000)
  .map((person) => person.name);

console.log(sal6);

const people = [
  { name: "Alice", gender: "Female" },
  { name: "Bob", gender: "Male" },
  { name: "Carol", gender: "Female" },
  { name: "David", gender: "Male" },
  { name: "Emma", gender: "Female" },
];

// 성별별 이름 배열
let genderName = people.reduce((acc, elem) => {
  let key = elem.gender;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(elem.name);
  return acc;
}, {});

console.log(genderName);

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Carol", score: 78 },
  { name: "David", score: 90 },
];

// 모든 학생의 점수 총합
let stuSum = students.reduce((acc, elem) => {
  return acc + elem.score;
}, 0);

console.log(stuSum);

const employeess = [
  { name: "Alice", dept: "HR", salary: 5000 },
  { name: "Bob", dept: "IT", salary: 6000 },
  { name: "Carol", dept: "HR", salary: 7000 },
  { name: "David", dept: "IT", salary: 5500 },
  { name: "Emma", dept: "Sales", salary: 6500 },
];

// 부서별 최대 급여자
let maxSal = employeess.reduce((acc, elem) => {
  let key = elem.dept;
  if (!acc[key] || elem.salary > acc[key].salary) {
    acc[key] = elem;
  }
  return acc;
}, {});

for (let dept in maxSal) {
  maxSal[dept] = maxSal[dept].name;
}

console.log(maxSal);

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Carol", age: 41 },
  { name: "David", age: 27 },
  { name: "Emma", age: 35 },
];
