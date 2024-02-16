import React from "react";
import Layout from "../components/Layout";
import "./style/Comm.css";
import { FaComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ComItem = (props) => (
  <div className="comItem">
    <h3>{props.tit}</h3>
    <div className="comItemPs">
      <p>{props.time}</p>
      <div className="itemRi">
        <p>
          <FaComment /> {props.re}
        </p>
        <p>
          <RiEyeLine size="21px" /> {props.view}
        </p>
      </div>
    </div>
  </div>
);

export default function Comm() {
  return (
    <Layout>
      <section id="comm">
        <article>
          <div id="writeBtnWrap">
            <div>
              <Link to="write">
                <button id="writeBtn">글쓰기</button>
              </Link>
            </div>
          </div>
          <ComItem tit="글 제목" time="12:00" cate="카테고리" re="1" view="2" />
          <ComItem tit="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit" time="12:00" cate="카테고리" re="1" view="2" />
          <ComItem tit="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit" time="12:00" cate="카테고리" re="1" view="2" />
        </article>
      </section>
    </Layout>
  );
}
