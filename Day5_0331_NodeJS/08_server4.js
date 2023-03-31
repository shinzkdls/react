let http = require("http");
let fs = require("fs"); //파일읽기
let url = require("url"); //url분석을 위한 라이브러리

//07_server3 파일과 url다름
//http:127.0.0.1:4000/add?x=4&y=5
let server = http
  .createServer((request, response) => {
    //console.log(request);
    //console.log(request.url); //전송url 예시)http:127.0.0.1:4000/add?x=4&y=5
    console.log(request.method); //전송방식 GET인지 POST인지

    let rurl = request.url;
    let pathname = url.parse(rurl, true).pathname; // add가 연산됨
    let query = url.parse(rurl, true).query;
    //string 분석 -> json객체로 전환
    //파싱한다
    console.log(query);
    console.log(pathname);
    console.log(typeof query);

    if (pathname == "/add") {
      response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      let x = parseInt(query.x);
      let y = parseInt(query.y);
      let z = x + y;
      response.end(`${x} + ${y} = ${z}`);
    } else {
      response.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
      response.end("<h1>존재하지 않는 url입니다.</h1>");
    }
  })
  .listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
  });
