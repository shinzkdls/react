var mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306,
});

//db와 연결을한다.
pool.getConnection((err, connection) => {
  //디비와연결을 성공하면 매개변수로 전달된 함수가 호출된다.
  //err - 디비와연결실패시 처리
  if (err) {
    console.log(err);
    return;
  }
  //연결성공시 연결객체 connection을 전달한다
  //연결객체
  console.log("connection success");
  sql = `select id 
               ,title
               ,writer
               ,date_format(wdate, '%Y-%m-%d') wdate
         from tb_board`;
  connection.query(sql, (err, rows) => {
    console.log(rows);
    connection.release(); //연결해제
  });
});
console.log("end");
