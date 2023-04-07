let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");

router.use(express.urlencoded({ extended: false }));

/* GET home page. */
router.get("/", async function (req, res, next) {
  sql = `select id
               ,title
               ,writer
               ,contents
               ,date_format(wdate, '%Y-%m-%d') wdate
         from tb_board`;

  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list", { boardList: results });
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
