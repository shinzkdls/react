let http = require("http");

let server = http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<H1>Hello my first Webserver</H1>");
  })
  .listen(3000, () => {
    console.log("server start http://127.0.0.1:3000");
  });
