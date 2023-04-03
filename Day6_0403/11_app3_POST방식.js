var express = require("express");
var app = express(); // 서버 만들었음

//bodyParser 모듈이 있는데 모듈을 설치하고했어야함 => 현재는 express자체적으로 포함돼있음
app.use(express.urlencoded({ extended: false })); // => 이 설정을 해줘야 body에 데이터를 가져온다
//윗줄 같은것을 '미들웨어'라고 한다. app객체 만들고, 다른 url처리전에만 호출되면 된다.
app.post("/add", (request, response) => {
  let x = request.body.x;
  let y = request.body.y;
  let z = parseInt(x) + parseInt(y);

  response.send({ x: x, y: y, z: z });
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// get방식의 경우 ?x=4&y=5 request.query.x
// get방식의 경우 /4/5 request.params.x
// post방식의 경우 app.use(express.urlencoded({ extended: false })); 을 반드시 선행하고
// request.body.x로 처리한다.
