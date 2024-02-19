import React from "react";
import Layout from "../components/Layout";
import "./style/Comm.css";
import { FaComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { 글리스트 } from "../lib/ComItem";

const ComItem = (props) => (
  <div className="comItem">
    <Link to={`item/${props.index}`}>
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

export default function () {
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
