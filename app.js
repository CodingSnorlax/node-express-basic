//透過express，建立web service
const express = require("express");
const app = express(); //express中的各種功能
const user = require('./routes/user'); //(1)路由模組化-引入
const cart = require('./routes/cart'); //(1)路由模組化-引入

//basic1. 進入首頁
app.get("/", function (req, res) {
  res.send("<h1>hello</h1>");
});

app.use("/user", user); //(2)路由模組化-套用
app.use("/cart", cart); //(2)路由模組化-套用

//basic2.監聽 port
const port = process.env.PORT || 2888;
app.listen(port);
