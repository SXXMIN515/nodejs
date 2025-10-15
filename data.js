// module기능.
const studentAry = [
  { sno: 100, sname: "홍길동", score: 80 },
  { sno: 200, sname: "김민수", score: 57 },
  { sno: 300, sname: "박철민", score: 77 },
  { sno: 400, sname: "오영수", score: 92 },
];
function sum(a, b) {
  return a + b;
}
const PI = 3.14;

function getStudentInfo() {
  return ["홍길동", "김민식", "박충원", "홍영기"];
}

export { studentAry, sum, PI };
