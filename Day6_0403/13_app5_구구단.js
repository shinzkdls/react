var express = require("express");
var app = express(); // 서버 만들었음
var ejs = require("ejs");
var fs = require("fs");

//app.set("view engine", ejs); // 내부변수에 값을 설정한다.
//미들웨어를 사용한다.
app.use(express.urlencoded({ extended: false }));

//http://127.0.0.1:4000/gugu?dan=4
app.get("/gugu", (request, response) => {
  let dan = parseInt(request.query.dan);
  let gugudan = [{ dan: dan, num: 1, mul: 1 * dan }];
  for (i = 2; i < 10; i++) {
    gugudan.push({ dan: dan, num: i, mul: i * dan });
  }
  response.send(gugudan);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
