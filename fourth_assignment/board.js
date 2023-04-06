let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");

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

module.exports = router;
