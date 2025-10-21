const mysql = require("./sql");
const xlsx = require("xlsx");

function excel_to_db() {
  // mysql -> excel
  // workbook - sheet
  const workbook = xlsx.readFile("./files/new_customers.xlsx");
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트명
  const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트
  const excelData = xlsx.utils.sheet_to_json(firstSheet); // 시트 -> json배열
  console.log(excelData);

  // json배열 -> mysql insert
  excelData.forEach(async (item) => {
    let result = await mysql.queryExecute("INSERT INTO customers SET ?", [
      item,
    ]);
    console.log(result);
  });
}
excel_to_db();

function db_to_excel() {
  // mysql에서 고객데이터 조회 -> 엑셀파일로 저장
  mysql
    .queryExecute("SELECT id, name, email, phone, address FROM customers", [])
    .then((result) => {
      console.log(result); // 엑셀파일 데이터.
      // 워크북 생성 -> sheet 추가 -> 파일저장
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers"); // workbook에 sheet 추가
      xlsx.writeFile(workbook, "./files/customers.xlsx"); // 파일저장
    })
    .catch((err) => {
      console.error(err);
    });
}
