const express = require("express");
const router = express.Router();

// '/':상품정보, '/add':상품등록 라우팅 처리.
router.get("/", (req, res) => {
  res.send("Products Home Page");
});

router.post("/add", (req, res) => {
  // 상품등록 처리 로직 작성.
  console.log(req.body);
  res.send("Product Added");
});

module.exports = router;
