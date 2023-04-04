var express = require("express");
var app = express(); // 서버 만들었음

//첫번째 미들웨어
app.use((request, response, next) => {
  //request : 브라우저 -> 서버
  //response : 서버 -> 브라우저
  //next : 다음함수를 호출한다.
  request.name = "홍길동";
  response.name = "John";
  console.log("aaaaaaa");
  next(); //바로 아래의 함수실행됨
});

//두번째 미들웨어
app.use((request, response, next) => {
  console.log("bbbbbbb");
  request.phone = "010-0000-0000";
  response.address = "서울시 영등포구";
  next(); //바로 아래의 함수실행됨
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  console.log(request.name);
  console.log(response.name);
  console.log(request.phone);
  console.log(response.address);
  response.end(`<h1>${request.name}</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
