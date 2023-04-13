import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Outlet,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SERVERIP } from "../../CommonUtil";

function BoardWriter(props) {
  let { id } = useParams();
  let history = useNavigate();
  const [heroName, setHeroName] = useState("");
  const [heroDesc, setHeroDesc] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/hero/view/" + id);
      console.log(results.data.hero.HERO_NAME);
      console.log(results.data.hero.HERO_DESC);

      setHeroName(results.data.hero.HERO_NAME);
      setHeroDesc(results.data.hero.HERO_DESC);
    }
    if (id != undefined) loadData(id); //write가 아니고 view로 호출할때
    // BoardWriter컴포넌트가 /board/writre 일때는 id에는 undefined가 오고
    // /board/view/1 일때는 id에 파라미터값이 저장된다.
  }, []);

  const nameChange = (e) => {
    setHeroName(e.target.value);
  };

  const descChange = (e) => {
    setHeroDesc(e.target.value);
  };

  //서버로 전송하기
  const postData = () => {
    //데이터를 json으로 묶어서 보내야한다.
    let data = { hero_name: heroName, hero_desc: heroDesc };
    axios
      .post(SERVERIP + "/hero/write", data)
      .then((res) => {
        console.log(res.data);
        history("/board/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>게시판 글쓰기</h1>
      <table className="table table-hover " style={{ marginTop: "30px" }}>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>

        <tbody>
          <tr>
            <td>이름</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="영웅의 이름을 입력하세요"
                  onChange={nameChange}
                  value={heroName}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>업적</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="영웅의 업적을 입력하세요"
                  onChange={descChange}
                  value={heroDesc}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="container mt-3" style={{ textAlign: "right" }}>
        <Link className="btn btn-secondary" onClick={postData}>
          등록
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-secondary">취소</Link>
      </div>
    </div>
  );
}

export default BoardWriter;
