let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({ extended: false }));

/* GET home page. */
router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);

  let sql = `SELECT COUNT(*) as cnt
             FROM tb_board A
             LEFT OUTER JOIN (SELECT @rownum:=0) B 
             ON 1=1
             LEFT OUTER JOIN tb_member C
             ON A.WRITER = C.USERID`;
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `SELECT *
         FROM (SELECT A.ID
                     ,A.TITLE
                     ,DATE_FORMAT(A.WDATE, '%Y-%m-%d') AS WDATE
                     ,C.USERNAME
                     ,@ROWNUM:=@ROWNUM+1 AS NUM
               FROM tb_board A
               LEFT OUTER JOIN (SELECT @rownum:=0) B 
               ON 1=1
               LEFT OUTER JOIN tb_member C
               ON A.WRITER = C.USERID
               ORDER BY ID DESC) A
        LIMIT ${(pg-1)*10} ,10`;

  results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list", {
    session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg:pg,
    paging:commonUtil.getPaging(pg,totalCnt)
  });
});

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  sql = `select id
               ,title
               ,writer
               ,contents
               ,date_format(wdate, '%Y-%m-%d') wdate
         from tb_board
         where id = ?`;
  let results = await commonDB.mysqlRead(sql, [id]);
  let boardItem = results.find((board) => board.id == id);
  res.render("board/board_view", { boardItem: boardItem });
});

router.get("/write", async function (req, res, next) {
  res.render("board/board_write");
});

router.post("/save", async function (req, res, next) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let params = [title, writer, contents];
  sql = `insert into tb_board(title, writer, contents, wdate)
         values(?,?,?,now())`;
  let results = await commonDB.mysqlRead(sql, [title, writer, contents]);
  res.redirect("/board");
});

module.exports = router;
