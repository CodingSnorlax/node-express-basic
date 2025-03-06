//建立模組時，一律都先載入 express
const express = require("express");
const router = express.Router();

router.get("/checkout", function (req, res) {
  res.send("<h1>結帳頁面</h1>");
});

router.get("/product-info-list", function (req, res) {
  res.send("<h1>購買商品資訊</h1>");
});

//動態路由
router.get("/coupon/:seq", function (req, res) {
  const seq = req.params.seq; //從動態路由取值
  res.send(`<h1>商品優惠券${seq}</h1>`);
});

//參數 (query)
//實際路徑： /cart/search?keyword=卡比獸
router.get("/search", function (req, res) {
  const keyword = req.query.keyword;
  res.send(`<h1>以下是有關${keyword}的商品內容</h1>`);
});

module.exports = router;
