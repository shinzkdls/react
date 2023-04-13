var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
// http://127.0.0.1:9090/score/list
router.get("/list", async function (req, res, next) {
  let sql = `SELECT ID, 
             STUDENT_NAME, 
             KOR,
             ENG,
             MAT, 
             DATE_FORMAT(A.WDATE, '%Y-%m-%d') AS WDATE
             FROM TB_SCORE A`;
  let result = await commonDB.mysqlRead(sql, []);
  res.json(result);
});

router.post("/write", async function (req, res, next) {
  try {
    let student_name = req.body.student_name;
    let kor = req.body.kor;
    let eng = req.body.eng;
    let mat = req.body.mat;
    let sql = `INSERT INTO TB_HERO(STUDENT_NAME, KOR, ENG,MAT WDATE)
               VALUES(?,?,?,?,NOW())`;

    let results = await commonDB.mysqlRead(sql, [student_name, kor, eng, mat]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

//http://127.0.0.1:9090/score/view/1
router.get("/view/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let sql = `SELECT *
               FROM TB_SCORE
               WHERE ID=${id}`;

    let results = await commonDB.mysqlRead(sql, []);
    res.json({ result: "success", score: results[0] });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

router.post("/update", async function (req, res, next) {
  try {
    let id = req.body.id;
    let student_name = req.body.student_name;
    let kor = req.body.kor;
    let eng = req.body.eng;
    let mat = req.body.mat;
    let sql = `UPDATE TB_SCORE SET STUDENT_NAME=?, KOR=?, ENG=?, MAT=?
               WHERE ID =?`;
    let results = await commonDB.mysqlRead(sql, [
      student_name,
      kor,
      eng,
      mat,
      id,
    ]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

module.exports = router;
