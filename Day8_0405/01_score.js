var express = require("express");
var app = express(); // 서버 만들었음
var ejs = require("ejs");
app.set("view engine", ejs);
app.use(express.urlencoded({ extended: false }));

let scoreData = [{ id: 1, name: "홍길동", kor: 90, eng: 80, mat: 100 }];

// url은 서버 전체에서 유일해야함 반드시!!
app.get("/score/list", (request, response) => {
  //views/score/score_list.ejs
  //express framework가 디자인파일들은 무조건 views폴더에 놓기로 약속함
  //response객체에 render라는 함수를 express가 추가
  //render함수 첫번째 매개변수 : html파일, 두번째 매개변수 : 데이터를 JSON형태로 전달해야함
  //이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다.
  response.render("score/score_list.ejs", { scoreList: scoreData });
  // 전송받은 score_list.ejs에서는 데이터 키값을 scroeList로 찾으면됨
});

app.get("/score/view/:id", (request, response) => {
  let id = request.params.id;
  //filter는 조건을 만족하는 모든 데이터셋(배열로 반환)
  //find는 조건을 만족하는 첫번째 데이터만(배열 아님)
  let scoreItem = scoreData.find((score) => score.id == id);
  response.render("score/score_view.ejs", { score: scoreItem });
});

app.get("/score/write", (request, response) => {
  response.render("score/score_write.ejs");
});

app.post("/score/save", (request, response) => {
  let name = request.body.name; //score_write.ejs에서 넘어온 데이터는 request.body에 들어있음
  let kor = parseInt(request.body.kor);
  let eng = parseInt(request.body.eng);
  let mat = parseInt(request.body.mat);
  let id = 0;
  id = scoreData[scoreData.length - 1].id + 1; //제일 마지막에 있는 데이터의 id + 1

  data = { id: id, name: name, kor: kor, eng: eng, mat: mat };
  scoreData.push(data);

  //redirect함수를 이용해서 /score/list를 호출해야한다
  response.redirect("/score/list");
});

app.use("/", (request, response) => {
  response.render("index.ejs");
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>404 Error</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
