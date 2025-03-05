//建立模組時，一律都先載入 express
const express = require("express");
const router = express.Router();

// 實際路徑： /user/main
router.get("/main", function (req, res) {
  res.send("<h1>user main page</h1>");
});

// 動態路由 => dynamic routing，能夠靈活處理不同的用戶和日期等資訊
// 實際路徑： /user/frank/20250212
router.get("/:name/:date", function (req, res) {
  const name = req.params.name;
  const date = req.params.date;
  res.send(`<h1>${name}</h1>在 ${date} 出生`);
});

// [ 參數 ] 的用法
// 實際路徑： /user/user-list
router.get("/user-list", function (req, res) {
  const limit = req.query.limit;
  res.send(`查詢使用者前 ${limit} 筆資料`);
});

module.exports = router;