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
  sql = `insert into tb_board(title, writer, contents, wdate)
         values(?,?,?,now())`;
  let params = ["제목3", "장길산", "내용3"];
  connection.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("insert 성공");

      sql = `select * from tb_board`; /////////////(2)아래의 쿼리가 이쪽에 자리하면 수행순서를 보장받을 수 있음.
      connection.query(sql, (err, rows) => {
        console.log(rows);
        //connection.release(); //연결해제
      });

      //connection.release(); //연결해제
    }
  });

  //////////////(1)비동기 방식이기때문에 위아래 쿼리중 뭐가 먼저 수행될지 알 수 없다.

  sql = `select * from tb_board`;
  connection.query(sql, (err, rows) => {
    console.log(rows);
    //connection.release(); //연결해제
  });
});
console.log("end");
 