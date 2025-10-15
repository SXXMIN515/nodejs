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

let jsonString = `[{"id":1,"first_name":"Stillmann","last_name":"Speirs","email":"sspeirs0@symantec.com","gender":"Agender","salary":7506},
{"id":2,"first_name":"Feodora","last_name":"Giovanni","email":"fgiovanni1@narod.ru","gender":"Female","salary":8880},
{"id":3,"first_name":"Tallie","last_name":"Beldham","email":"tbeldham2@privacy.gov.au","gender":"Male","salary":8102},
{"id":4,"first_name":"Loy","last_name":"Durnford","email":"ldurnford3@wufoo.com","gender":"Agender","salary":7105},
{"id":5,"first_name":"Germain","last_name":"Peret","email":"gperet4@businesswire.com","gender":"Male","salary":7754},
{"id":6,"first_name":"Peter","last_name":"Duchatel","email":"pduchatel5@cargocollective.com","gender":"Male","salary":8151},
{"id":7,"first_name":"Fowler","last_name":"Hertwell","email":"fhertwell6@java.com","gender":"Male","salary":3290},
{"id":8,"first_name":"Tonya","last_name":"MacCafferky","email":"tmaccafferky7@spotify.com","gender":"Female","salary":6384},
{"id":9,"first_name":"Kizzee","last_name":"More","email":"kmore8@china.com.cn","gender":"Female","salary":3466},
{"id":10,"first_name":"Robenia","last_name":"Coldrick","email":"rcoldrick9@bravesites.com","gender":"Female","salary":7389},
{"id":11,"first_name":"Had","last_name":"Blaes","email":"hblaesa@biglobe.ne.jp","gender":"Male","salary":3091},
{"id":12,"first_name":"Gasparo","last_name":"Bearfoot","email":"gbearfootb@posterous.com","gender":"Male","salary":5184},
{"id":13,"first_name":"Andrej","last_name":"Kirmond","email":"akirmondc@scribd.com","gender":"Male","salary":8085},
{"id":14,"first_name":"Rosalie","last_name":"Mowat","email":"rmowatd@wix.com","gender":"Female","salary":8943},
{"id":15,"first_name":"Trenton","last_name":"Truter","email":"ttrutere@g.co","gender":"Male","salary":3685}]`;

export { studentAry, sum, getStudentInfo, jsonString };
