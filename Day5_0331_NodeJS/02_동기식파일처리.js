// //동기식 파일 처리
// //파일을 모두 읽고나서 리턴한다.
// var fs = require("fs");
// // require - 외 부모들을 프로그램 안으로 불러온다.
// // 주의사항 = java의 import가 아님
// //            java의 import는 라이브러리를 메모리로 불러 들이는게 아니고 라이브러리 이름을 깗게 썼을때 본래 긴 이름을 제시해주는 역할
// //            import java.util.List
// //            List<String> list;라고 쓰면 List의 풀네임을 써야한다.
// //            java.util.List<String> list는 너무 길기때문에
// //            풀네임은 위의 import 구문으로 확인하라는 의미
// //            라이브러리 자체는 이미 불러와있는 상태이다.

// //동기모드 함수는 반환값에 파일의 내용이 온다.
// var data = fs.readFileSync("./hello.js", "utf-8");
// console.log(data);
// console.log("프로그램 종료");

//동기식 파일 처리
//파일을 모두 읽고나서 리턴한다.
var fs = require("fs");
// require - 외 부모들을 프로그램 안으로 불러온다.
// 주의사항 = java의 import가 아님
//            java의 import는 라이브러리를 메모리로 불러 들이는게 아니고 라이브러리 이름을 깗게 썼을때 본래 긴 이름을 제시해주는 역할
//            import java.util.List
//            List<String> list;라고 쓰면 List의 풀네임을 써야한다.
//            java.util.List<String> list는 너무 길기때문에
//            풀네임은 위의 import 구문으로 확인하라는 의미
//            라이브러리 자체는 이미 불러와있는 상태이다.

//동기모드 함수는 반환값에 파일의 내용이 온다.
var data = fs.readFileSync("./01_hello.js", "utf-8");
console.log(data);
console.log("프로그램 종료");

//절대 경로로 바꾸니 디버그콘솔 및 출력에도 오류 안남
//C:/Users/shinz/Desktop/디지캠퍼스/04.리액트/모던스크립트/Day5_0331_NodeJS/01_hello.js
