let fs = require("fs");

//비동기식, 파일을 읽기 전에 함수가 반환되어서 반환값을 사용할 수 없다.
//콜백함수를 3번째 매개번수로 전달한다.
fs.readFile("./01_hello.js", "utf-8", (err, data) => {
  //이 함수는 파일을 모두 읽은 후 시스템에 의해 호출된다.
  console.log(data);
});
console.log("프로그램 완료");

//절대 경로로 바꾸니 디버그콘솔 및 출력에도 오류 안남
//C:/Users/shinz/Desktop/디지캠퍼스/04.리액트/모던스크립트/Day5_0331_NodeJS/01_hello.js
