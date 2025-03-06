//透過express，建立web service
const express = require("express");
const app = express(); //express中的各種功能
const user = require("./routes/user"); //(1)路由模組化-引入
const cart = require("./routes/cart"); //(1)路由模組化-引入

/* middleware--start:
 * 概念類似守門員 (會先通過這邊的設定才進入下一階段)
 */
const login = function (req, res, next) {
  const _url = req.url;
  if (_url !== "/") {
    console.log("狀態已登入！");
    next(); //條件滿足，前往下個區域
  } else {
    console.log("您無權限觀看此頁");
    res.send("您無權限觀看此頁"); //條件不滿足，被驅離
  }
};

app.use(login);
/* middleware--end */

//basic1. 進入首頁、可加入身份驗證
app.get("/", login, function (req, res) {
  // openaaa();
  res.send("<h1>歡迎來到 e_e </h1>");
});

app.use("/user", user); //(2)路由模組化-套用
app.use("/cart", cart); //(2)路由模組化-套用

/**
 * [ 找不到路由處理 ] 請求的路由找不到 (404)
 */
app.use(function (req, res, next) {
  res.status(404).send("PAGE NOT FOUND!");
});

/**
 * [ 錯誤處理 ] 發現程式有錯誤的處理，程式不會中斷
 */
app.use(function (err, req, res, next) {
  console.error("err:", err.stack);
  res.status(500).send("伺服器內部發生錯誤，請稍後再試"); //openaaa is not defined
});

//basic2.監聽 port
const port = process.env.PORT || 2888;
app.listen(port);
