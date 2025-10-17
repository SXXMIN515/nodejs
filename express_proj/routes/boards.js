const express = require("express");
const router = express.Router();

// '/':상품정보, '/add':상품등록 라우팅 처리.
// '/board' get/post/put/delete
router
  .route("/board")
  .get((req, res) => {
    res.send("Board GET");
  })
  .post((req, res) => {
    res.send("Board POST");
  })
  .put((req, res) => {
    res.send("Board PUT");
  })
  .delete((req, res) => {
    res.send("Board DELETE");
  });

module.exports = router;
