var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("member/member_register", { title: "Express" });
});

//아이디 중복체크
// 1. 클라이언트로부터 아이디를 받는다
// 2. 받아온 아이디를 디비에 가서 존재하는지 유무확인
// 3. 존재하면 fail을 반환, 존재하지않으면 success 반환
router.use("/idcheck", async function (req, res, next) {
  let userid = req.body.userid; //사용자단에서 userid
  sql = `select count(*) as cnt
         from tb_member
         where userid='${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if (cnt == 0) res.json({ result: "success" });
  else res.json({ result: "fail" });
});

// /member/save
router.use("/save", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let nickname = req.body.nickname;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;

  let sql = `insert into tb_member(userid,password,username,nickname,email,phone,zipcode,address1,address2,wdate)
    values(?,?,?,?,?,?,?,?,?,now())`;

  try {
    await commonDB.mysqlRead(sql, [
      userid,
      password,
      username,
      nickname,
      email,
      phone,
      zipcode,
      address1,
      address2,
    ]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

// /member/login
router.use("/login", async function (req, res, next) {
  res.render("member/member_logon");
});

// /member/logincheck
router.use("/logincheck", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;

  let sql = `select count(*) as cnt
             from tb_member
             where userid='${userid}'
             and password='${password}'`;
  let rows = await commonDB.mysqlRead(sql, [userid, password]);
  let cnt = rows[0]["cnt"];
  if (cnt == 1) res.json({ result: "success" });
  else res.json({ result: "fail" });
});

// 로그인 풀이
router.post("/loginsol", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select *
             from tb_member
             where userid='${userid}'`;
  let result = await commonDB.mysqlRead(sql);
  if (result.length == 0) {
    res.json({ result: "fail", msg: "아이디가 없습니다." });
    return;
  }
  console.log(result[0]);
  if (result[0]["PASSWORD"] != password) {
    res.json({ result: "fail", msg: "패스워드가 일치하지 않습니다." });
    return;
  }
  req.session["username"] = result[0]["USERNAME"];
  req.session["userid"] = result[0]["USERID"];
  req.session["email"] = result[0]["EMAIL"];

  console.log(result[0]["USERNAME"]);
  console.log(result[0]["USERID"]);
  console.log(result[0]["EMAIL"]);

  res.json({ result: "success", msg: "로그인 성공" });
});

router.use("/logout", async function (req, res, next) {
  req.session["username"] ="";
  req.session["userid"] = "";
  req.session["email"] = "";
  res.redirect("/")//로그아웃하고 나면 index로 이동시키기

  //req.session.destroy(); //이건 세션자체를 지우는것
});

//세션
router.get("/put", async function (req, res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  //console.log(req.session["userid"]);
});

module.exports = router;
