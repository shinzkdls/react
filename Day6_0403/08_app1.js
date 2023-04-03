var express = require("express");
var app = express(); // 서버 만들었음

//express 모듈자체가 use, get, post 함수 3개가 있음
// use - get, post 둘다 처리
// get - get방식으로 온것만 처리
// post - post방식으로 온것만 처리

app.use("/test", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Test</h1>");
});

app.get("/get", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>get</h1>");
});

app.get("/userinfo", (request, response) => {
  let userinfo = { name: "Tom", phone: "010-0000-0000" };
  response.send(userinfo); //send 함수를 티용해서 JSON데이터 송신
});

//userinfo2?name=Jane&phone=010000000000
app.get("/userinfo2", (request, response) => {
  //request.query.name;
  let userinfo = {
    name: request.query.name, //query임
    phone: request.query.phone, //query임
  };
  response.send(userinfo); //send 함수를 티용해서 JSON데이터 송신
});

//get방식임 - 새롭게 추가된 url방식
//userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (request, response) => {
  //request.params.name;
  let userinfo = {
    username: request.params.username, //params임
    userid: request.params.userid, //params임
  };
  console.log(userinfo);
  response.send(userinfo); //send 함수를 티용해서 JSON데이터 송신
});

app.post("/post", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>post</h1>");
});

//다른url처리 없을때 처리한다.
app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
