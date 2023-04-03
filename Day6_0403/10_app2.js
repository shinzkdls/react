var express = require("express");
var app = express(); // 서버 만들었음

//http://127.0.0.1:4000/add?x=45&y=7
app.get("/add", (request, response) => {
  let number = {
    x: request.query.x,
    y: request.query.y,
    sum: parseInt(request.query.x) + parseInt(request.query.y),
  };
  response.send(number);
});

//http://127.0.0.1:4000/add2/45/7
app.get("/add2/:x/:y", (request, response) => {
  let number = {
    x: request.params.x,
    y: request.params.y,
    sum: parseInt(request.params.x) + parseInt(request.params.y),
  };
  response.send(number);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
