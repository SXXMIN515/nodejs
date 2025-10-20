const express = require("express");
const router = express.Router();

// '/':고객정보, '/add':고객등록 라우팅 처리.
router.get("/", (req, res) => {
  res.send("Customers Home Page");
});

router.post("/add", (req, res) => {
  // 고객등록 처리 로직 작성.
  console.log(req.body);
  res.send("Customer Added");
});

module.exports = router;
