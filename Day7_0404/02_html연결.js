var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); // 서버 만들었음

//bodyParse -- npm install bodyParser를 하고해야한다.
//새버전에서는 express가 가지고있다.
//post로 전송할때 request.body에 보낸 정보를 추가해서
//사용이 간편하도록 도와주는 미들웨어이다.
app.use(express.urlencoded({ extended: false }));

app.get("/input", (request, response) => {
  fs.readFile("./02_input.html", "utf-8", (err, data) => {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end(data);
  });
});

app.get("/login", (request, response) => {
  let userid = request.query.userid; // input태그의 name속성으로 가져와야함 반드시
  let password = request.query.password;
  if (userid == "test" && password == "1234") {
    response.send("login success"); // send함수는 writeHead를 안써도된다
  } else {
    response.send("login fail");
  }
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
