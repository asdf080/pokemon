import React from "react";
import Layout from "../components/Layout";
import "./style/Comm.css";
import { FaComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ComItem = (props) => (
  <div className="comItem">
    <Link
      to={{
        pathname: `item/${props.index}`,
        state: { ...props },
      }}
    >
      <h3>{props.tit}</h3>
    </Link>
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

const 글리스트 = [
  { tit: "글제목", content: "글내용", time: "12:00", cate: "카테고리1", re: 1, view: 2 },
  { tit: "Lorem ipsum dolor sit amet", content: "글내용", time: "12:00", cate: "카테고리2", re: 1, view: 2 },
  { tit: "consectetur adipiscing elit", content: "글내용", time: "12:00", cate: "카테고리1", re: 1, view: 2 },
];

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
          {글리스트.map((item, index) => (
            <ComItem key={index} index={index} tit={item.tit} time={item.time} cate={item.cate} re={item.re} view={item.view} />
          ))}
        </article>
      </section>
    </Layout>
  );
}
