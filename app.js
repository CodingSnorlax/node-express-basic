//透過express，建立web service
const express = require("express");
const app = express(); //express中的各種功能
const user = require('./routes/user'); //(1)路由模組化-引入

//basic1. 進入首頁
app.get("/", function (req, res) {
  res.send("<h1>hello</h1>");
});

//(2)路由模組化-套用
app.use("/user", user);

//basic2.監聽 port
const port = process.env.PORT || 2888;
app.listen(port);
