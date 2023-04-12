var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
// http://127.0.0.1:9090/hero/list
router.get("/list", async function (req, res, next) {
  // res.json([
  //   { id: 1, name: "이순신", descr: "임진왜란승리" },
  //   { id: 2, name: "강감찬", descr: "귀주대첩" },
  //   { id: 3, name: "을지문덕", descr: "살수대첩" },
  //   { id: 4, name: "세종대왕", descr: "한글창제" },
  //   { id: 5, name: "문종", descr: "자격루" },
  // ]);
  let sql = `SELECT ID, 
             HERO_NAME, 
             HERO_DESC, 
             DATE_FORMAT(A.WDATE, '%Y-%m-%d') AS WDATE
             FROM TB_HERO A`;
  let result = await commonDB.mysqlRead(sql, []);
  res.json(result);
});

router.post("/writer", async function (req, res, next) {
  try {
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `INSERT INTO TB_HERO(HERO_NAME, HERO_DESC, WDATE)
               VALUES(?,?,NOW())`;

    let result = await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

module.exports = router;
