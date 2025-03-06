//透過express，建立web service
const express = require("express");
const app = express(); //express中的各種功能
const userRouter = require("./routes/user"); //(1)路由模組化-引入
const cartRouter = require("./routes/cart"); //(1)路由模組化-引入

/* middleware--start:
 * 概念類似守門員 (會先通過這邊的設定才進入下一階段)
 */
const login = function (req, res, next) {
  // const _url = req.url;
  // if (_url == "/") {
  //   console.log("狀態已登入！");
  //   next(); //條件滿足，前往下個區域
  // } else {
  //屬於預期內的錯誤
  //   console.log("您無權限觀看此頁");
  //   res.send("您無權限觀看此頁"); //條件不滿足，被驅離
  // }
  next();
};

app.use(login);
/* middleware--end */

//basic1. 身份驗證、進入首頁(cb function)
app.get("/", login, function (req, res) {
  //openaaa();
  res.status(200).json({
    status: "success",
    message: "已進入首頁",
  });
});

app.use("/user", userRouter); //(2)路由模組化-套用
app.use("/cart", cartRouter); //(2)路由模組化-套用

/**
 * [ 找不到路由處理 ] 請求的路由找不到 (404)
 */
app.use(function (req, res, next) {
  res.status(404).json({
    status: "false",
    message: "路由不存在 NOT FOUND",
  });
});

/**
 * [ express 全域捕捉錯誤處理 ] 發現程式「預期外」的錯誤處理，程式不會中斷
 * 可透過 next(error) 進到全域錯誤捕捉，並可回傳 err.name、err.message
 * 可透過 throw error 進到全域錯誤捕捉，並可回傳 err.name、err.message
 */
app.use(function (err, req, res, next) {
  console.log(err.name);
  res.status(500).json({
    err: err.name,
  });
});

//basic2.監聽 port
const port = process.env.PORT || 2888;
app.listen(port);
